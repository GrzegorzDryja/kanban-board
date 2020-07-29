/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_task_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/task-input */ "./src/components/task-input.ts");
/* harmony import */ var _components_task_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/task-list */ "./src/components/task-list.ts");


new _components_task_input__WEBPACK_IMPORTED_MODULE_0__["InputForm"]();
new _components_task_list__WEBPACK_IMPORTED_MODULE_1__["KanbanBoard"]("to-do");
new _components_task_list__WEBPACK_IMPORTED_MODULE_1__["KanbanBoard"]("in-progress");
new _components_task_list__WEBPACK_IMPORTED_MODULE_1__["KanbanBoard"]("done");


/***/ }),

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
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


/***/ }),

/***/ "./src/components/task-input.ts":
/*!**************************************!*\
  !*** ./src/components/task-input.ts ***!
  \**************************************/
/*! exports provided: InputForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputForm", function() { return InputForm; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_kanban_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/kanban-state */ "./src/state/kanban-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class InputForm extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__["validate"](taskValidatable)) {
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
            _state_kanban_state__WEBPACK_IMPORTED_MODULE_3__["kanbanState"].addTask(userInput);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], InputForm.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/task-item.ts":
/*!*************************************!*\
  !*** ./src/components/task-item.ts ***!
  \*************************************/
/*! exports provided: KanbanTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KanbanTask", function() { return KanbanTask; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class KanbanTask extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["autobind"]
], KanbanTask.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["autobind"]
], KanbanTask.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/task-list.ts":
/*!*************************************!*\
  !*** ./src/components/task-list.ts ***!
  \*************************************/
/*! exports provided: KanbanBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KanbanBoard", function() { return KanbanBoard; });
/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/task */ "./src/models/task.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_kanban_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/kanban-state */ "./src/state/kanban-state.ts");
/* harmony import */ var _task_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task-item */ "./src/components/task-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class KanbanBoard extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
        _state_kanban_state__WEBPACK_IMPORTED_MODULE_3__["kanbanState"].moveTask(taskId, this.state === "to-do" ? _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].ToDo :
            this.state === "in-progress" ? _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].InProgress : _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].Done);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl === null || listEl === void 0 ? void 0 : listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        _state_kanban_state__WEBPACK_IMPORTED_MODULE_3__["kanbanState"].addListener((tasks) => {
            const crucialTasks = tasks.filter(tsk => {
                if (this.state === "to-do") {
                    return tsk.status === _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].ToDo;
                }
                if (this.state === "in-progress") {
                    return tsk.status === _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].InProgress;
                }
                return tsk.status === _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].Done;
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
            new _task_item__WEBPACK_IMPORTED_MODULE_4__["KanbanTask"](this.element.querySelector("ul").id, kanItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], KanbanBoard.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], KanbanBoard.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__["autobind"]
], KanbanBoard.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/*! exports provided: autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
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


/***/ }),

/***/ "./src/models/task.ts":
/*!****************************!*\
  !*** ./src/models/task.ts ***!
  \****************************/
/*! exports provided: TaskStatus, Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskStatus", function() { return TaskStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return Task; });
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


/***/ }),

/***/ "./src/state/kanban-state.ts":
/*!***********************************!*\
  !*** ./src/state/kanban-state.ts ***!
  \***********************************/
/*! exports provided: KanbanState, kanbanState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KanbanState", function() { return KanbanState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kanbanState", function() { return kanbanState; });
/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/task */ "./src/models/task.ts");

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
        const newTask = new _models_task__WEBPACK_IMPORTED_MODULE_0__["Task"](Math.random().toString(), task, _models_task__WEBPACK_IMPORTED_MODULE_0__["TaskStatus"].ToDo);
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


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/*! exports provided: validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YXNrLWlucHV0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Rhc2staXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90YXNrLWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy90YXNrLnRzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9rYW5iYW4tc3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtR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QWdCLENBQUMsU0FBUyxDQUFDO0tBQzFFO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiaW1wb3J0IHsgSW5wdXRGb3JtIH0gZnJvbSBcIi4vY29tcG9uZW50cy90YXNrLWlucHV0XCI7XHJcbmltcG9ydCB7IEthbmJhbkJvYXJkIH0gZnJvbSBcIi4vY29tcG9uZW50cy90YXNrLWxpc3RcIlxyXG5cclxubmV3IElucHV0Rm9ybSgpO1xyXG5uZXcgS2FuYmFuQm9hcmQoXCJ0by1kb1wiKTtcclxubmV3IEthbmJhbkJvYXJkKFwiaW4tcHJvZ3Jlc3NcIik7XHJcbm5ldyBLYW5iYW5Cb2FyZChcImRvbmVcIik7XHJcbiIsIlxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgdGFyZ2V0RWxlbWVudDogVDtcclxuICBlbGVtZW50OiBVO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sXHJcbiAgICBuZXdFbGVtZW5ldElkPzogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSA8SFRNTFRlbXBsYXRlRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcbiAgICBcclxuICAgIHRoaXMudGFyZ2V0RWxlbWVudCA9IDxUPmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpO1xyXG5cclxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgXHJcbiAgICB0aGlzLmVsZW1lbnQgPSA8VT4gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgaWYgKG5ld0VsZW1lbmV0SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVuZXRJZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoKGluc2VydEF0U3RhcnQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudGFyZ2V0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoaW5zZXJ0QXRTdGFydCA/IFwiYWZ0ZXJiZWdpblwiIDogXCJiZWZvcmVlbmRcIiwgdGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XHJcbmltcG9ydCAqIGFzIFZhbGlkYXRpb24gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCBhcyBBdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmltcG9ydCB7IGthbmJhblN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL2thbmJhbi1zdGF0ZVwiO1xyXG5cclxuIFxyXG5leHBvcnQgY2xhc3MgSW5wdXRGb3JtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4ge1xyXG4gIHRhc2tJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcImlucHV0LWZvcm1cIiwgXCJ0YXJnZXRcIiwgdHJ1ZSwgXCJ1c2VyLWlucHV0XCIpO1xyXG5cclxuICAgIHRoaXMudGFza0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpe307XHJcblxyXG4gIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IHN0cmluZyB8IHZvaWQge1xyXG4gICAgY29uc3QgZW50ZXJlZFRhc2sgPSB0aGlzLnRhc2tJbnB1dC52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB0YXNrVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkVGFzayxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgbWF4TGVuZ3RoOiAyNTYsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghVmFsaWRhdGlvbi52YWxpZGF0ZSh0YXNrVmFsaWRhdGFibGUpKSB7XHJcbiAgICAgIGFsZXJ0KFwiSW52YWxpZCBpbnB1dCwgdHJ5IGFnYWluLlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGVudGVyZWRUYXNrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgIHRoaXMudGFza0lucHV0LnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgaWYgKHVzZXJJbnB1dCkge1xyXG4gICAgICBrYW5iYW5TdGF0ZS5hZGRUYXNrKHVzZXJJbnB1dCk7XHJcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vbW9kZWxzL3Rhc2tcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2FuYmFuVGFzayBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcbiAgcHJvdGVjdGVkIHRhc2s6IFRhc2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCB0YXNrOiBUYXNrKXtcclxuICAgIHN1cGVyKFwic2luZ2xlLXRhc2tcIiwgaG9zdElkLCBmYWxzZSwgdGFzay5pZCk7XHJcbiAgICB0aGlzLnRhc2sgPSB0YXNrO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIHRoaXMudGFzay5pZCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcclxuICB9O1xyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdFbmRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpe1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpXHJcbiAgfTtcclxuXHJcbiAgY29uZmlndXJlKCl7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgdGhpcy5kcmFnRW5kSGFuZGxlcilcclxuICB9O1xyXG4gIHJlbmRlckNvbnRlbnQoKXtcclxuICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMudGFzay50YXNrO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XHJcbmltcG9ydCB7IFRhc2ssIFRhc2tTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Rhc2tcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmltcG9ydCB7IGthbmJhblN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL2thbmJhbi1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBLYW5iYW5UYXNrIH0gZnJvbSBcIi4vdGFzay1pdGVtXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBLYW5iYW5Cb2FyZCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ1RhcmdldHtcclxuICBhc3NpZ25lZFRhc2tzOiBUYXNrW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGU6IFwidG8tZG9cIiB8IFwiaW4tcHJvZ3Jlc3NcIiB8IFwiZG9uZVwiKSB7XHJcbiAgICBzdXBlcihcImthbmJhbi1ib2FyZFwiLCBcImZsZXgtY29udGFpbmVyXCIsIGZhbHNlLCBgJHtzdGF0ZX0tdGFza2ApO1xyXG4gICAgdGhpcy5hc3NpZ25lZFRhc2tzID0gW107XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGlmKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09IFwidGV4dC9wbGFpblwiKXtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcclxuICAgICAgbGlzdEVsPy5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XHJcbiAgICBjb25zdCB0YXNrSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xyXG4gICAga2FuYmFuU3RhdGUubW92ZVRhc2sodGFza0lkLFxyXG4gICAgICB0aGlzLnN0YXRlID09PSBcInRvLWRvXCIgPyBUYXNrU3RhdHVzLlRvRG8gOlxyXG4gICAgICAgIHRoaXMuc3RhdGUgPT09IFwiaW4tcHJvZ3Jlc3NcIiA/IFRhc2tTdGF0dXMuSW5Qcm9ncmVzcyA6IFRhc2tTdGF0dXMuRG9uZSlcclxuICB9XHJcblxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCl7XHJcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpO1xyXG4gICAgbGlzdEVsPy5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcHBhYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCl7ICAgIFxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG5cclxuICAgIGthbmJhblN0YXRlLmFkZExpc3RlbmVyKCh0YXNrczogVGFza1tdKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNydWNpYWxUYXNrcyA9IHRhc2tzLmZpbHRlcih0c2sgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBcInRvLWRvXCIpIHtcclxuICAgICAgICAgIHJldHVybiB0c2suc3RhdHVzID09PSBUYXNrU3RhdHVzLlRvRG87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBcImluLXByb2dyZXNzXCIpIHtcclxuICAgICAgICAgIHJldHVybiB0c2suc3RhdHVzID09PSBUYXNrU3RhdHVzLkluUHJvZ3Jlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0c2suc3RhdHVzID09PSBUYXNrU3RhdHVzLkRvbmU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmFzc2lnbmVkVGFza3MgPSBjcnVjaWFsVGFza3M7XHJcbiAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMuc3RhdGV9YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkID0gbGlzdElkO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnN0YXRlLnRvVXBwZXJDYXNlKCkgKyBcIiBUQVNLU1wiO1xyXG4gIH1cclxuICBcclxuICBwcml2YXRlIHJlbmRlclRhc2tzKCkge1xyXG4gICAgY29uc3QgbGlzdEVsID0gPEhUTUxVTGlzdEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMuc3RhdGV9YCk7XHJcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGZvciAoY29uc3Qga2FuSXRlbSBvZiB0aGlzLmFzc2lnbmVkVGFza3MpIHtcclxuICAgICAgbmV3IEthbmJhblRhc2sodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQsIGthbkl0ZW0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZChfOiBhbnksIF8yOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gYWRqRGVzY3JpcHRvcjtcclxufVxyXG4iLCJleHBvcnQgZW51bSBUYXNrU3RhdHVzIHtcclxuICBUb0RvLFxyXG4gIEluUHJvZ3Jlc3MsXHJcbiAgRG9uZSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgdGFzazogc3RyaW5nLFxyXG4gICAgcHVibGljIHN0YXR1czogVGFza1N0YXR1c1xyXG4gICkge31cclxufVxyXG4iLCJpbXBvcnQgeyBUYXNrLCBUYXNrU3RhdHVzfSBmcm9tIFwiLi4vbW9kZWxzL3Rhc2tcIjtcclxuXHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcblxyXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEthbmJhblN0YXRlIGV4dGVuZHMgU3RhdGU8VGFzaz4ge1xyXG4gIHByaXZhdGUgdGFza3M6IFRhc2tbXSA9IFtdO1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBLYW5iYW5TdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgS2FuYmFuU3RhdGUoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFzayh0YXNrOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksIHRhc2ssIFRhc2tTdGF0dXMuVG9Ebyk7XHJcbiAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgbW92ZVRhc2sodGFza0lkOiBzdHJpbmcsIG5ld1N0YXR1czogVGFza1N0YXR1cykge1xyXG4gICAgY29uc3QgdGFzayA9IHRoaXMudGFza3MuZmluZCh0c2sgPT4gdHNrLmlkID09PSB0YXNrSWQpO1xyXG4gICAgaWYodGFzayAmJiB0YXNrLnN0YXR1cyAhPT0gbmV3U3RhdHVzKXtcclxuICAgICAgdGFzay5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpe1xyXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgIGxpc3RlbmVyRm4odGhpcy50YXNrcy5zbGljZSgpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBrYW5iYW5TdGF0ZSA9IEthbmJhblN0YXRlLmdldEluc3RhbmNlKCk7XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiBWYWxpZGF0YWJsZSkge1xyXG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCkge1xyXG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiZcclxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXHJcbiAgKSB7XHJcbiAgICBpc1ZhbGlkID1cclxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcclxuICApIHtcclxuICAgIGlzVmFsaWQgPVxyXG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=