import { KanbanInput } from './components/kanban-input.ts';
import { TaskList } from './components/task-list.ts';

const kanbanInput = new KanbanInput();
const todo = new TaskList('to-do');
const inprogress = new TaskList('in-progress');
const done = new TaskList('done');
