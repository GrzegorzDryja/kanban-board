import { KanbanInput } from './components/kanban-input.ts';
import { TaskList } from './components/task-list.ts';

new KanbanInput();
new TaskList('to-do');
new TaskList('in-progress');
new TaskList('done');
