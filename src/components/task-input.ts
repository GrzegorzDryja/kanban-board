import Component from "./base-component";
import * as Validation from "../util/validation";
import { autobind as Autobind } from "../decorators/autobind";
import { kanbanState } from "../state/kanban-state";

 
export class InputForm extends Component<HTMLDivElement, HTMLElement> {
  taskInput: HTMLInputElement;
  counter: HTMLInputElement;

  constructor() {
    super("input-form", "target", true, "user-input");
    this.taskInput = <HTMLInputElement> this.element.querySelector("#task");
    this.counter = <HTMLInputElement> this.element.querySelector("#counter");
    this.configure();
    this.renderContent();
  }
  
  renderContent(){    
    // const counter = <HTMLElement> this.element.querySelector("#counter")!;
    this.taskInput.addEventListener("keyup", (e) => { this.counter.innerText = `${this.taskInput.value.length}/256`});
  };

  configure() {
    this.element.addEventListener("submit", this.submitHandler);  
  }

  private gatherUserInput(): string | void {
    const enteredTask = this.taskInput.value;
    
    const taskValidatable: Validation.Validatable = {
      value: enteredTask,
      required: true,
      minLength: 1,
      maxLength: 256,
    };

    if (!Validation.validate(taskValidatable)) {
      alert("Invalid input, try again.");
      return;
    } else {
      return enteredTask;
    }
  }

  private clearInputs() {
    this.taskInput.value = "";
    this.counter.innerText = "0/256";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (userInput) {
      kanbanState.addTask(userInput);
      this.clearInputs();
    }
  }
}
