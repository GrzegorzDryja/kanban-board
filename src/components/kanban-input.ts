// @ts-ignore
import { autobind as Autobind } from '../decorators/autobind.ts'; //Need to ignore errors from .ts

export class KanbanInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
  
    constructor() {
      this.templateElement = document.getElementById(
        'task-input'
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById('app')! as HTMLDivElement;
  
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as HTMLFormElement;
      this.element.id = 'user-input';

      this.titleInputElement = this.element.querySelector('#title');
      this.descriptionInputElement = this.element.querySelector('#description');

      this.configure();
      this.attach();
    }

    private allyUserInput(): [string, string] | void {
      const enteredTitle = this.titleInputElement.value; //Note that always return text
      const enteredDescription = this.descriptionInputElement.value;
  
      if ( //Check if input is not empty
        enteredTitle.trim().length === 0 ||
        enteredDescription.trim().length === 0
      ) {
        alert('Empty input, please try again!');
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
        console.log(title, desc);
        this.clearInputs();
      }
    }

    private configure() {
      this.element.addEventListener('submit', this.submitHandler); //Have to call it with bind witch is in decorator
    } 
  
    private attach() {
      this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
  }
  