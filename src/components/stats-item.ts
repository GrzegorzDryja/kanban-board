import Component from "./base-component";

export class StatsItem extends Component<HTMLUListElement, HTMLLIElement> {
 private task: string;
 private time: number;

  constructor(task: string, time: number){
    super("stats-item", "ul-stats", false);
    this.task = task;
    this.time = time;

    this.renderContent();
  }
  configure(){}
  renderContent(){
    this.element.textContent =  `Task "${this.task}" took ${this.time}s.`
  }
}
