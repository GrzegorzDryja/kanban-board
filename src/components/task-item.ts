import { Draggable } from "../models/drag-drop";
import { Task } from "../models/task";
import Component from "./base-component";
import { autobind } from "../decorators/autobind";

export class KanbanTask extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  protected task: Task;

  constructor(hostId: string, task: Task){
    super("single-task", hostId, false, task.id);
    this.task = task;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent){
    event.dataTransfer!.setData("text/plain", this.task.id);
    event.dataTransfer!.effectAllowed = "move";
  };

  @autobind
  dragEndHandler(event: DragEvent){

    if(this.task.status === 1){
      this.count();
    } else {
      this.stop();
    }
  };

  configure(){
    this.element.addEventListener("dragstart", this.dragStartHandler)
    this.element.addEventListener("dragend", this.dragEndHandler)
  };

  renderContent(){
    this.element.textContent = this.task.task;
  };

  private count(){
    this.task.timeInterval = window.setInterval(() => {
      this.task.time++
    }, 1000);    
  }

  private stop() {
    clearInterval(this.task.timeInterval);
    console.log(`Task ${this.task.task} took ${this.task.time}s`);
  }
}
