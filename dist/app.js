"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["ToDo"] = 0] = "ToDo";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Done"] = 2] = "Done";
})(TaskStatus || (TaskStatus = {}));
class Task {
    constructor(id, task, status) {
        this.id = id;
        this.task = task;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class KanbanState extends State {
    constructor() {
        super();
        this.tasks = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new KanbanState();
        return this.instance;
    }
    addTask(task) {
        const newTask = new Task(Math.random().toString(), task, TaskStatus.ToDo);
        this.tasks.push(newTask);
        this.updateListeners();
    }
    moveTask(taskId, newStatus) {
        const task = this.tasks.find(tsk => tsk.id === taskId);
        if (task && task.status !== newStatus) {
            task.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.tasks.slice());
        }
    }
}
const kanbanState = KanbanState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElemenetId) {
        this.templateElement = document.getElementById(templateId);
        this.targetElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElemenetId) {
            this.element.id = newElemenetId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.targetElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
class KanbanTask extends Component {
    constructor(hostId, task) {
        super("single-task", hostId, false, task.id);
        this.task = task;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.task.id);
        event.dataTransfer.effectAllowed = "move";
    }
    ;
    dragEndHandler(event) {
        console.log(event);
    }
    ;
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    ;
    renderContent() {
        this.element.textContent = this.task.task;
    }
    ;
}
__decorate([
    autobind
], KanbanTask.prototype, "dragStartHandler", null);
__decorate([
    autobind
], KanbanTask.prototype, "dragEndHandler", null);
class KanbanBoard extends Component {
    constructor(state) {
        super("kanban-board", "flex-container", false, `${state}-task`);
        this.state = state;
        this.assignedTasks = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl === null || listEl === void 0 ? void 0 : listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const taskId = event.dataTransfer.getData("text/plain");
        kanbanState.moveTask(taskId, this.state === "to-do" ? TaskStatus.ToDo :
            this.state === "in-progress" ? TaskStatus.InProgress : TaskStatus.Done);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl === null || listEl === void 0 ? void 0 : listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        kanbanState.addListener((tasks) => {
            const crucialTasks = tasks.filter(tsk => {
                if (this.state === "to-do") {
                    return tsk.status === TaskStatus.ToDo;
                }
                if (this.state === "in-progress") {
                    return tsk.status === TaskStatus.InProgress;
                }
                return tsk.status === TaskStatus.Done;
            });
            this.assignedTasks = crucialTasks;
            this.renderTasks();
        });
    }
    renderContent() {
        const listId = `${this.state}`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.state.toUpperCase() + " TASKS";
    }
    renderTasks() {
        const listEl = document.getElementById(`${this.state}`);
        listEl.innerHTML = "";
        for (const kanItem of this.assignedTasks) {
            new KanbanTask(this.element.querySelector("ul").id, kanItem);
        }
    }
}
__decorate([
    autobind
], KanbanBoard.prototype, "dragOverHandler", null);
__decorate([
    autobind
], KanbanBoard.prototype, "dropHandler", null);
__decorate([
    autobind
], KanbanBoard.prototype, "dragLeaveHandler", null);
class InputForm extends Component {
    constructor() {
        super("input-form", "target", true, "user-input");
        this.taskInput = this.element.querySelector("#task");
        this.configure();
    }
    renderContent() { }
    ;
    gatherUserInput() {
        const enteredTask = this.taskInput.value;
        const taskValidatable = {
            value: enteredTask,
            required: true,
            minLength: 1,
            maxLength: 256,
        };
        if (!validate(taskValidatable)) {
            alert("Invalid input, try again.");
            return;
        }
        else {
            return enteredTask;
        }
    }
    clearInputs() {
        this.taskInput.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (userInput) {
            kanbanState.addTask(userInput);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    autobind
], InputForm.prototype, "submitHandler", null);
const task = new InputForm();
const todoList = new KanbanBoard("to-do");
const inprogressList = new KanbanBoard("in-progress");
const doneList = new KanbanBoard("done");
//# sourceMappingURL=app.js.map