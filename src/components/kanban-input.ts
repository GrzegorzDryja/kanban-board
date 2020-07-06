import { autobind as Autobind } from '../decorators/autobind.ts'; //Need to ignore errors from .ts
import * as Validation from '../util/validation.ts';
import { taskState } from '../state/task-state.ts';
import { Component } from '../components/base-components.ts';

export class KanbanInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
  
    constructor() {
      super('task-input', 'app', true, 'user-input');
      this.titleInputElement = this.element.querySelector('#title');
      this.descriptionInputElement = this.element.querySelector('#description');

      this.configure();
    }

    configure() {      
      this.element.addEventListener('submit', this.submitHandler); //Have to call it with bind witch is in decorator
    }
    renderContent(){};

    private allyUserInput(): [string, string] | void {
      const enteredTitle = this.titleInputElement.value; //Note that always return text
      const enteredDescription = this.descriptionInputElement.value;
  
      const titleValidatable: Validation.Validatable = {
        value: enteredTitle,
        required: true
      };
      const descriptionValidatable: Validation.Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
      };
  
      if (
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable)
      ) {
        alert("Input shouldn't be empty/description min 5 chars length, please try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription];
      }
    }
  
    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {//To awoid errors set "experimentalDecorators": true, in tsconfig.ts
      event.preventDefault(); //To block http request
      const userInput = this.allyUserInput();
      if (Array.isArray(userInput)) { //Check ts tuple in js
        const [title, desc] = userInput;
        taskState.addTask(title, desc);
        console.log(title, desc);
        this.clearInputs();
      }
    } 
  }
  