class KanbanState {
  private listeners: any[] = [];
  private tasks: any[] = [];
  private static instance: KanbanState;

  private constructor(){

  }

  static getInstance() {
    if (this.instance){
      return this.instance;
    }
    this.instance = new KanbanState();
    return this.instance;
  }

  addListener(listenerFn: Function){
    this.listeners.push(listenerFn);
  }

  addTask(task: string){
    const newTask = {
      id: Math.random().toString(),
      task: task
    };
    this.tasks.push(newTask);
    for(const listenerFn of this.listeners){
      listenerFn(this.tasks.slice())
    }
  }
}

const kanbanState = KanbanState.getInstance();

interface Validatable {
  value: string;
  required: boolean;
  minLength: number;
  maxLength: number;
}

function validate(validatableInput: Validatable){
  let isValid = true;
  if(validatableInput.required){
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === "string"){
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === "string"){
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  return isValid;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class KanbanBoard{
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  element: HTMLElement;
  assignedTasks: any[];

  constructor(private type: "to-do" | "in-progress" | "done"){
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector("#kanban-board")
    );
    this.targetElement = <HTMLDivElement>document.querySelector("#flex-container");
    this.assignedTasks = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-task`;

      kanbanState.addListener((tasks: any[]) => {
        this.assignedTasks = tasks;
        this.renderTasks();
      })

    this.attach();
    this.renderContent();    
  }

  private renderTasks(){
    const listEl = <HTMLUListElement>document.querySelector(`#${this.type}`);
    for(const kanItem of this.assignedTasks) {
      const listItem = document.createElement('li');
      listItem.textContent = kanItem.task;
      listEl.appendChild(listItem);
    }
  }

  private renderContent(){
    const listId = `${this.type}`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase() +" TASKS";
  }

  private attach() {
    this.targetElement.insertAdjacentElement("beforeend", this.element);
  }
}

class InputForm {
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  element: HTMLFormElement;
  taskInput: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector("#input-form")
    );
    this.targetElement = <HTMLDivElement>document.querySelector("#target");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";

    this.taskInput = <HTMLInputElement>this.element.querySelector("#task");

    this.configure();
    this.attach();
  }

  private gatherUserInput(): string | void {
    const enteredTask = this.taskInput.value;

    const taskValidatable: Validatable = {
      value: enteredTask,
      required: true,
      minLength: 1,
      maxLength: 256
    }

    if (!validate(taskValidatable)) {
      alert("Invalid input, try again.");
      return;
    } else {
      return enteredTask;
    }
  }

  private clearInputs(){
    this.taskInput.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if(userInput){
      kanbanState.addTask(userInput);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const task = new InputForm();
const todoList = new KanbanBoard("to-do");
const inprogressList = new KanbanBoard("in-progress");
const doneList = new KanbanBoard("done");
