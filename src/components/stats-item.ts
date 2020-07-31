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
    const hours = Math.floor(this.time / 360);
    const min = Math.floor(this.time / 60);
    const sec = this.time % 60;
    const h = this.addZero(hours);
    const m = this.addZero(min);
    const s = this.addZero(sec);
    this.element.textContent =  `Task "${this.task}" was in-progress state for ${h}:${m}:${s}`
  }

  private addZero (x: number){
    return x < 10? `0${x}` : x;
  }
}
