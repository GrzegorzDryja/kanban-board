class InputForm{
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor(){
    this.templateElement = <HTMLTemplateElement> document.querySelector("#input-form");
    this.targetElement = <HTMLDivElement> document.querySelector("#target");

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = <HTMLFormElement> importedNode.firstElementChild;
    this.attach();
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.element)
  }
}

const task = new InputForm();
