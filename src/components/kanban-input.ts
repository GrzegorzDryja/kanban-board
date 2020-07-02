import { autobind as Autobind } from '../decorators/autobind.ts';

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

    @Autobind
    private submitHandler(event: Event) { //To awoid errors set "experimentalDecorators": true, in tsconfig.ts
      event.preventDefault(); //To block http request
      console.log(this.titleInputElement.value);
    }

    private configure() {
      this.element.addEventListener('submit', this.submitHandler); //Have to call it with bind
    } 
  
    private attach() {
      this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
  }
  