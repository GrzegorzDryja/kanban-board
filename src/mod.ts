import { KanbanInput } from './components/kanban-input.ts';
import { TaskList } from './components/task-list.ts';

const kanbanInput = new KanbanInput();
const todo = new TaskList('todo');
const inprogress = new TaskList('inprogress');
const done = new TaskList('done');
