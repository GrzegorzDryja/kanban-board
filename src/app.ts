class InputForm{
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  element: HTMLFormElement;
  taskInput: HTMLInputElement;

  constructor(){
    this.templateElement = <HTMLTemplateElement> document.querySelector("#input-form");
    this.targetElement = <HTMLDivElement> document.querySelector("#target");

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = <HTMLFormElement> importedNode.firstElementChild;
    this.element.id = "user-input";

    this.taskInput = <HTMLInputElement> this.element.querySelector("#task");

    this.configure();
    this.attach();
  }

  private submitHandler(event: Event){
    event.preventDefault();
    console.log(this.taskInput.value)
  }

  private configure(){
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.element)
  }
}

const task = new InputForm();
