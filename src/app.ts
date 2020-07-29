import { InputForm } from "./components/task-input.ts";
import { KanbanBoard } from "./components/task-list.ts"

new InputForm();
new KanbanBoard("to-do");
new KanbanBoard("in-progress");
new KanbanBoard("done");
