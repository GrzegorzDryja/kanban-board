import { taskState } from '../state/task-state.ts';
import { Task, TaskStatus } from '../models/kanban.ts';

export class TaskList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    addedTasks: Task[];
  
    constructor(private type: 'to-do' | 'in-progress' | 'done') {
      this.templateElement = document.getElementById('task-list')! as HTMLTemplateElement;
      this.hostElement = document.getElementById('flex-container')! as HTMLDivElement;
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild! as HTMLElement;
      this.element.id = `${this.type}-task`;

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

      this.attach();
      this.renderContent();
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
  
    private renderContent() {
      const listId = `${this.type}-task-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase();      
    }
  
    private attach() {
      this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
  }
  