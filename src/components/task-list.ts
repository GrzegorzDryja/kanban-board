export class TaskList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
  
    constructor(private type: 'todo' | 'inprogress' | 'done') {
      this.templateElement = document.getElementById(
        'task-list'
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById('flex-container')! as HTMLDivElement;
  
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as HTMLElement;
      this.element.id = `${this.type}-task`;
      this.attach();
      this.renderContent();
    }
  
    private renderContent() {
      const listId = `${this.type}-task-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase();      
    }
  
    private attach() {
      this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
  }
  