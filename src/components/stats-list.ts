import Component from "./base-component";

export class Stats extends Component<HTMLUListElement, HTMLLIElement>{
  constructor(){
    super("stats", "target", false)

    this.configure();
    this.renderContent();
  }
  configure(){};
  renderContent(){
    this.element.querySelector("ul")!.id = "ul-stats";
  };
}
