"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
class KanbanState {
    constructor() {
        this.listeners = [];
        this.tasks = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new KanbanState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addTask(task) {
        const newTask = new Task(Math.random().toString(), task, TaskStatus.ToDo);
        this.tasks.push(newTask);
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
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
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
class KanbanBoard {
    constructor(state) {
        this.state = state;
        this.templateElement = (document.querySelector("#kanban-board"));
        this.targetElement = document.querySelector("#flex-container");
        this.assignedTasks = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.state}-task`;
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
        this.attach();
        this.renderContent();
    }
    renderTasks() {
        const listEl = document.querySelector(`#${this.state}`);
        listEl.innerHTML = "";
        for (const kanItem of this.assignedTasks) {
            const listItem = document.createElement('li');
            listItem.textContent = kanItem.task;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.state}`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.state.toUpperCase() + " TASKS";
    }
    attach() {
        this.targetElement.insertAdjacentElement("beforeend", this.element);
    }
}
class InputForm {
    constructor() {
        this.templateElement = (document.querySelector("#input-form"));
        this.targetElement = document.querySelector("#target");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.taskInput = this.element.querySelector("#task");
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTask = this.taskInput.value;
        const taskValidatable = {
            value: enteredTask,
            required: true,
            minLength: 1,
            maxLength: 256
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
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.element);
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