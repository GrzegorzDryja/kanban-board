import { TaskStatus, Task } from '../models/kanban.ts';

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
  
    addListener(listenerFunc: Listener<T>) {
      this.listeners.push(listenerFunc);
    }
  }

export class TaskState extends State<Task> {
    private tasks: Task[] = [];
    private static instance: TaskState;
  
    private constructor() {
        super();
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new TaskState();
      return this.instance;
    }
  
    addTask(title: string, description: string) {
      const newTask = new Task(
        Math.random().toString(),
        title,
        description,
        TaskStatus.ToDo
      );
      this.tasks.push(newTask);
      for (const listenerFunc of this.listeners) {
        listenerFunc(this.tasks.slice()); //slice for copy
      }
    }
  }

 export const taskState = TaskState.getInstance();
