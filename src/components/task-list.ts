import { taskState } from '../state/task-state.ts';
import { Task } from '../models/kanban.ts';

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
        this.addedTasks = tasks;
        this.renderTasks();
      })

      this.attach();
      this.renderContent();
    }

    private renderTasks() {
      const listElement = document.getElementById(`${this.type}-task-list`);
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
  