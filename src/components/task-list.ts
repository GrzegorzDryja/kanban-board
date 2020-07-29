import { DragTarget } from "../models/drag-drop";
import { Task, TaskStatus } from "../models/task";
import Component from "./base-component";
import { autobind } from "../decorators/autobind";
import { kanbanState } from "../state/kanban-state";
import { KanbanTask } from "./task-item"

export class KanbanBoard extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  assignedTasks: Task[];

  constructor(private state: "to-do" | "in-progress" | "done") {
    super("kanban-board", "flex-container", false, `${state}-task`);
    this.assignedTasks = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if(event.dataTransfer && event.dataTransfer.types[0] === "text/plain"){
      event.preventDefault();
      const listEl = this.element.querySelector("ul");
      listEl?.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent){
    const taskId = event.dataTransfer!.getData("text/plain");
    kanbanState.moveTask(taskId,
      this.state === "to-do" ? TaskStatus.ToDo :
        this.state === "in-progress" ? TaskStatus.InProgress : TaskStatus.Done)
  }

  @autobind
  dragLeaveHandler(event: DragEvent){
    const listEl = this.element.querySelector("ul");
    listEl?.classList.remove("droppable");
  }

  configure(){    
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    kanbanState.addListener((tasks: Task[]) => {
      const crucialTasks = tasks.filter(tsk => {
        if (this.state === "to-do") {
          return tsk.status === TaskStatus.ToDo;
        }
        if (this.state === "in-progress") {
          return tsk.status === TaskStatus.InProgress;
        }
        return tsk.status === TaskStatus.Done;
      });
      this.assignedTasks = crucialTasks;
      this.renderTasks();
    });
  }

  renderContent() {
    const listId = `${this.state}`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.state.toUpperCase() + " TASKS";
  }
  
  private renderTasks() {
    const listEl = <HTMLUListElement> document.getElementById(`${this.state}`);
    listEl.innerHTML = "";
    for (const kanItem of this.assignedTasks) {
      new KanbanTask(this.element.querySelector("ul")!.id, kanItem)
    }
  }
}
