export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  targetElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElemenetId?: string,
  ) {
    this.templateElement = <HTMLTemplateElement> document.getElementById(templateId);
    
    this.targetElement = <T>document.getElementById(hostElementId);

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
  
    this.element = <U> importedNode.firstElementChild;
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
