// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
System.register("components/base-component", [], function (exports_1, context_1) {
    "use strict";
    var Component;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
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
            };
            exports_1("default", Component);
        }
    };
});
System.register("util/validation", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
    exports_2("validate", validate);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("decorators/autobind", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
    exports_3("autobind", autobind);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("models/task", [], function (exports_4, context_4) {
    "use strict";
    var TaskStatus, Task;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            (function (TaskStatus) {
                TaskStatus[TaskStatus["ToDo"] = 0] = "ToDo";
                TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
                TaskStatus[TaskStatus["Done"] = 2] = "Done";
            })(TaskStatus || (TaskStatus = {}));
            exports_4("TaskStatus", TaskStatus);
            Task = class Task {
                constructor(id, task, status) {
                    this.id = id;
                    this.task = task;
                    this.status = status;
                }
            };
            exports_4("Task", Task);
        }
    };
});
System.register("state/kanban-state", ["models/task"], function (exports_5, context_5) {
    "use strict";
    var task_ts_1, State, KanbanState, kanbanState;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (task_ts_1_1) {
                task_ts_1 = task_ts_1_1;
            }
        ],
        execute: function () {
            State = class State {
                constructor() {
                    this.listeners = [];
                }
                addListener(listenerFn) {
                    this.listeners.push(listenerFn);
                }
            };
            KanbanState = class KanbanState extends State {
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
                    const newTask = new task_ts_1.Task(Math.random().toString(), task, task_ts_1.TaskStatus.ToDo);
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
            };
            exports_5("KanbanState", KanbanState);
            exports_5("kanbanState", kanbanState = KanbanState.getInstance());
        }
    };
});
System.register("components/task-input", ["components/base-component", "util/validation", "decorators/autobind", "state/kanban-state"], function (exports_6, context_6) {
    "use strict";
    var base_component_ts_1, Validation, autobind_ts_1, kanban_state_ts_1, InputForm;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (base_component_ts_1_1) {
                base_component_ts_1 = base_component_ts_1_1;
            },
            function (Validation_1) {
                Validation = Validation_1;
            },
            function (autobind_ts_1_1) {
                autobind_ts_1 = autobind_ts_1_1;
            },
            function (kanban_state_ts_1_1) {
                kanban_state_ts_1 = kanban_state_ts_1_1;
            }
        ],
        execute: function () {
            InputForm = (() => {
                class InputForm extends base_component_ts_1.default {
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
                        if (!Validation.validate(taskValidatable)) {
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
                            kanban_state_ts_1.kanbanState.addTask(userInput);
                            this.clearInputs();
                        }
                    }
                    configure() {
                        this.element.addEventListener("submit", this.submitHandler);
                    }
                }
                __decorate([
                    autobind_ts_1.autobind
                ], InputForm.prototype, "submitHandler", null);
                return InputForm;
            })();
            exports_6("InputForm", InputForm);
        }
    };
});
System.register("models/drag-drop", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            ;
            ;
        }
    };
});
System.register("components/task-item", ["components/base-component", "decorators/autobind"], function (exports_8, context_8) {
    "use strict";
    var base_component_ts_2, autobind_ts_2, KanbanTask;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (base_component_ts_2_1) {
                base_component_ts_2 = base_component_ts_2_1;
            },
            function (autobind_ts_2_1) {
                autobind_ts_2 = autobind_ts_2_1;
            }
        ],
        execute: function () {
            KanbanTask = (() => {
                class KanbanTask extends base_component_ts_2.default {
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
                    autobind_ts_2.autobind
                ], KanbanTask.prototype, "dragStartHandler", null);
                __decorate([
                    autobind_ts_2.autobind
                ], KanbanTask.prototype, "dragEndHandler", null);
                return KanbanTask;
            })();
            exports_8("KanbanTask", KanbanTask);
        }
    };
});
System.register("components/task-list", ["models/task", "components/base-component", "decorators/autobind", "state/kanban-state", "components/task-item"], function (exports_9, context_9) {
    "use strict";
    var task_ts_2, base_component_ts_3, autobind_ts_3, kanban_state_ts_2, task_item_ts_1, KanbanBoard;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (task_ts_2_1) {
                task_ts_2 = task_ts_2_1;
            },
            function (base_component_ts_3_1) {
                base_component_ts_3 = base_component_ts_3_1;
            },
            function (autobind_ts_3_1) {
                autobind_ts_3 = autobind_ts_3_1;
            },
            function (kanban_state_ts_2_1) {
                kanban_state_ts_2 = kanban_state_ts_2_1;
            },
            function (task_item_ts_1_1) {
                task_item_ts_1 = task_item_ts_1_1;
            }
        ],
        execute: function () {
            KanbanBoard = (() => {
                class KanbanBoard extends base_component_ts_3.default {
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
                            listEl?.classList.add("droppable");
                        }
                    }
                    dropHandler(event) {
                        const taskId = event.dataTransfer.getData("text/plain");
                        kanban_state_ts_2.kanbanState.moveTask(taskId, this.state === "to-do" ? task_ts_2.TaskStatus.ToDo :
                            this.state === "in-progress" ? task_ts_2.TaskStatus.InProgress : task_ts_2.TaskStatus.Done);
                    }
                    dragLeaveHandler(event) {
                        const listEl = this.element.querySelector("ul");
                        listEl?.classList.remove("droppable");
                    }
                    configure() {
                        this.element.addEventListener("dragover", this.dragOverHandler);
                        this.element.addEventListener("dragleave", this.dragLeaveHandler);
                        this.element.addEventListener("drop", this.dropHandler);
                        kanban_state_ts_2.kanbanState.addListener((tasks) => {
                            const crucialTasks = tasks.filter(tsk => {
                                if (this.state === "to-do") {
                                    return tsk.status === task_ts_2.TaskStatus.ToDo;
                                }
                                if (this.state === "in-progress") {
                                    return tsk.status === task_ts_2.TaskStatus.InProgress;
                                }
                                return tsk.status === task_ts_2.TaskStatus.Done;
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
                            new task_item_ts_1.KanbanTask(this.element.querySelector("ul").id, kanItem);
                        }
                    }
                }
                __decorate([
                    autobind_ts_3.autobind
                ], KanbanBoard.prototype, "dragOverHandler", null);
                __decorate([
                    autobind_ts_3.autobind
                ], KanbanBoard.prototype, "dropHandler", null);
                __decorate([
                    autobind_ts_3.autobind
                ], KanbanBoard.prototype, "dragLeaveHandler", null);
                return KanbanBoard;
            })();
            exports_9("KanbanBoard", KanbanBoard);
        }
    };
});
System.register("app", ["components/task-input", "components/task-list"], function (exports_10, context_10) {
    "use strict";
    var task_input_ts_1, task_list_ts_1;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (task_input_ts_1_1) {
                task_input_ts_1 = task_input_ts_1_1;
            },
            function (task_list_ts_1_1) {
                task_list_ts_1 = task_list_ts_1_1;
            }
        ],
        execute: function () {
            new task_input_ts_1.InputForm();
            new task_list_ts_1.KanbanBoard("to-do");
            new task_list_ts_1.KanbanBoard("in-progress");
            new task_list_ts_1.KanbanBoard("done");
        }
    };
});

__instantiate("app", false);
