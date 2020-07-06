import { taskState } from '../state/task-state.ts';
import { Task, TaskStatus } from '../models/kanban.ts';
import { Component } from '../components/base-components.ts';

export class TaskList extends Component<HTMLDivElement, HTMLElement> {
    addedTasks: Task[];
  
    constructor(private type: 'to-do' | 'in-progress' | 'done') {
      super('task-list', 'flex-container', false,`${type}-task`);
      this.addedTasks = [];

      this.configure()
      this.renderContent();
    }

    configure() {
      taskState.addListener((tasks: Task[]) => {
        const relevantTasks = tasks.filter(tsk => {
          if (this.type === "to-do"){
          return tsk.status === TaskStatus.ToDo;
          } else if (this.type === "in-progress"){
            return tsk.status === TaskStatus.InProgress;
          } else {
            return tsk.status === TaskStatus.Done;
          }
        });
        this.addedTasks = relevantTasks;
        this.renderTasks();
      })
    };
  
    renderContent() {
      const listId = `${this.type}-task-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase();      
    }
    
    private renderTasks() {
      const listElement = document.getElementById(`${this.type}-task-list`);
      listElement.innerHTML = ''; //For adding new task all list will be render again
      for (const taskItem of this.addedTasks) {
        const listItem = document.createElement('li');
        listItem.textContent = taskItem.title;
        listElement.appendChild(listItem);
      }
    }
  }
  