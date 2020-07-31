import { InputForm } from "./components/task-input";
import { KanbanBoard } from "./components/task-list";
import { Stats } from "./components/stats-list";

new InputForm();
new KanbanBoard("to-do");
new KanbanBoard("in-progress");
new KanbanBoard("done");
new Stats();
