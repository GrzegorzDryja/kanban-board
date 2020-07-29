import { Draggable } from "../models/drag-drop.ts";
import { Task } from "../models/task.ts";
import Component from "./base-component.ts";
import { autobind } from "../decorators/autobind.ts";

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
    console.log(event)
  };

  configure(){
    this.element.addEventListener("dragstart", this.dragStartHandler)
    this.element.addEventListener("dragend", this.dragEndHandler)
  };
  renderContent(){
    this.element.textContent = this.task.task;
  };
}
