import { Task, TaskStatus} from "../models/task.ts";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class KanbanState extends State<Task> {
  private tasks: Task[] = [];
  private static instance: KanbanState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new KanbanState();
    return this.instance;
  }

  addTask(task: string) {
    const newTask = new Task(Math.random().toString(), task, TaskStatus.ToDo);
    this.tasks.push(newTask);
    this.updateListeners();
  }

  moveTask(taskId: string, newStatus: TaskStatus) {
    const task = this.tasks.find(tsk => tsk.id === taskId);
    if(task && task.status !== newStatus){
      task.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners(){
    for (const listenerFn of this.listeners) {
      listenerFn(this.tasks.slice());
    }
  }
}

export const kanbanState = KanbanState.getInstance();
