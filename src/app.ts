enum TaskStatus {
  ToDo,
  InProgress,
  Done,
}

class Task {
  constructor(
    public id: string,
    public task: string,
    public status: TaskStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class KanbanState extends State<Task> {
  private tasks: Task[] = [];
  private static instance: KanbanState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new KanbanState();
    return this.instance;
  }



  addTask(task: string) {
    const newTask = new Task(Math.random().toString(), task, TaskStatus.ToDo);
    this.tasks.push(newTask);
    for (const listenerFn of this.listeners) {
      listenerFn(this.tasks.slice());
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

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  targetElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElemenetId?: string,
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector(`#${templateId}`)
    );
    this.targetElement = <T>document.querySelector(`#${hostElementId}`);

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <U>importedNode.firstElementChild;
    if (newElemenetId) {
      this.element.id = newElemenetId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.targetElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class KanbanBoard extends Component<HTMLDivElement, HTMLElement> {
  assignedTasks: Task[];

  constructor(private state: "to-do" | "in-progress" | "done") {
    super("#kanban-board", "#flex-container", false, `${state}-task`);
    this.assignedTasks = [];

    this.configure();
    this.renderContent();
  }

  private renderTasks() {
    const listEl = <HTMLUListElement>document.querySelector(`#${this.state}`);
    listEl.innerHTML = ""; //Look up for it on implementing timer
    for (const kanItem of this.assignedTasks) {
      const listItem = document.createElement("li");
      listItem.textContent = kanItem.task;
      listEl.appendChild(listItem);
    }
  }

  configure(){    
    kanbanState.addListener((tasks: Task[]) => {
      const crucialTasks = tasks.filter((tsk) => {
        if (this.state === "to-do") {
          return tsk.status === TaskStatus.ToDo;
        }
        if (this.state === "in-progress") {
          return tsk.status === TaskStatus.InProgress;
        }
        return tsk.status === TaskStatus.Done;
      });
      this.assignedTasks = crucialTasks;
      this.renderTasks();
    });
  }

  renderContent() {
    const listId = `${this.state}`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.state.toUpperCase() + " TASKS";
  }
}

class InputForm extends Component<HTMLDivElement, HTMLElement> {
  taskInput: HTMLInputElement;

  constructor() {
    super("#input-form", "#target", true, "user-input");

    this.taskInput = <HTMLInputElement>this.element.querySelector("#task");

    this.configure();
  }

  renderContent(){};

  private gatherUserInput(): string | void {
    const enteredTask = this.taskInput.value;

    const taskValidatable: Validatable = {
      value: enteredTask,
      required: true,
      minLength: 1,
      maxLength: 256,
    };

    if (!validate(taskValidatable)) {
      alert("Invalid input, try again.");
      return;
    } else {
      return enteredTask;
    }
  }

  private clearInputs() {
    this.taskInput.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (userInput) {
      kanbanState.addTask(userInput);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const task = new InputForm();
const todoList = new KanbanBoard("to-do");
const inprogressList = new KanbanBoard("in-progress");
const doneList = new KanbanBoard("done");
