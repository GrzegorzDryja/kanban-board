import Component from "./base-component";
import * as Validation from "../util/validation";
import { autobind as Autobind } from "../decorators/autobind";
import { kanbanState } from "../state/kanban-state";

 
export class InputForm extends Component<HTMLDivElement, HTMLElement> {
  taskInput: HTMLInputElement;

  constructor() {
    super("input-form", "target", true, "user-input");

    this.taskInput = <HTMLInputElement>this.element.querySelector("#task");

    this.configure();
  }

  renderContent(){};

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

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
