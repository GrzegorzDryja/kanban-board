// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

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

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
System.register("decorators/autobind", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function autobind(_target, _methodName, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    exports_1("autobind", autobind);
    return {
        setters: [],
        execute: function () {
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
            typeof validatableInput.value === 'string') {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === 'string') {
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
System.register("models/kanban", [], function (exports_3, context_3) {
    "use strict";
    var TaskStatus, Task;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            (function (TaskStatus) {
                TaskStatus[TaskStatus["ToDo"] = 0] = "ToDo";
                TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
                TaskStatus[TaskStatus["Done"] = 2] = "Done";
            })(TaskStatus || (TaskStatus = {}));
            exports_3("TaskStatus", TaskStatus);
            Task = class Task {
                constructor(id, title, description, status) {
                    this.id = id;
                    this.title = title;
                    this.description = description;
                    this.status = status;
                }
            };
            exports_3("Task", Task);
        }
    };
});
System.register("state/task-state", ["models/kanban"], function (exports_4, context_4) {
    "use strict";
    var kanban_ts_1, State, TaskState, taskState;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (kanban_ts_1_1) {
                kanban_ts_1 = kanban_ts_1_1;
            }
        ],
        execute: function () {
            State = class State {
                constructor() {
                    this.listeners = [];
                }
                addListener(listenerFunc) {
                    this.listeners.push(listenerFunc);
                }
            };
            TaskState = class TaskState extends State {
                constructor() {
                    super();
                    this.tasks = [];
                }
                static getInstance() {
                    if (this.instance) {
                        return this.instance;
                    }
                    this.instance = new TaskState();
                    return this.instance;
                }
                addTask(title, description) {
                    const newTask = new kanban_ts_1.Task(Math.random().toString(), title, description, kanban_ts_1.TaskStatus.ToDo);
                    this.tasks.push(newTask);
                    for (const listenerFunc of this.listeners) {
                        listenerFunc(this.tasks.slice());
                    }
                }
            };
            exports_4("TaskState", TaskState);
            exports_4("taskState", taskState = TaskState.getInstance());
        }
    };
});
System.register("components/base-components", [], function (exports_5, context_5) {
    "use strict";
    var Component;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Component = class Component {
                constructor(templateId, hostElementId, insertAtStart, newElementId) {
                    this.templateElement = document.getElementById(templateId);
                    this.hostElement = document.getElementById(hostElementId);
                    const importedNode = document.importNode(this.templateElement.content, true);
                    this.element = importedNode.firstElementChild;
                    if (newElementId) {
                        this.element.id = newElementId;
                    }
                    this.attach(insertAtStart);
                }
                attach(insertAtBeginning) {
                    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
                }
            };
            exports_5("Component", Component);
        }
    };
});
System.register("components/kanban-input", ["decorators/autobind", "util/validation", "state/task-state", "components/base-components"], function (exports_6, context_6) {
    "use strict";
    var autobind_ts_1, Validation, task_state_ts_1, base_components_ts_1, KanbanInput;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (autobind_ts_1_1) {
                autobind_ts_1 = autobind_ts_1_1;
            },
            function (Validation_1) {
                Validation = Validation_1;
            },
            function (task_state_ts_1_1) {
                task_state_ts_1 = task_state_ts_1_1;
            },
            function (base_components_ts_1_1) {
                base_components_ts_1 = base_components_ts_1_1;
            }
        ],
        execute: function () {
            KanbanInput = (() => {
                class KanbanInput extends base_components_ts_1.Component {
                    constructor() {
                        super('task-input', 'app', true, 'user-input');
                        this.titleInputElement = this.element.querySelector('#title');
                        this.descriptionInputElement = this.element.querySelector('#description');
                        this.configure();
                    }
                    configure() {
                        this.element.addEventListener('submit', this.submitHandler);
                    }
                    renderContent() { }
                    ;
                    allyUserInput() {
                        const enteredTitle = this.titleInputElement.value;
                        const enteredDescription = this.descriptionInputElement.value;
                        const titleValidatable = {
                            value: enteredTitle,
                            required: true
                        };
                        const descriptionValidatable = {
                            value: enteredDescription,
                            required: true,
                            minLength: 5
                        };
                        if (!Validation.validate(titleValidatable) ||
                            !Validation.validate(descriptionValidatable)) {
                            alert("Input shouldn't be empty/description min 5 chars length, please try again!");
                            return;
                        }
                        else {
                            return [enteredTitle, enteredDescription];
                        }
                    }
                    clearInputs() {
                        this.titleInputElement.value = '';
                        this.descriptionInputElement.value = '';
                    }
                    submitHandler(event) {
                        event.preventDefault();
                        const userInput = this.allyUserInput();
                        if (Array.isArray(userInput)) {
                            const [title, desc] = userInput;
                            task_state_ts_1.taskState.addTask(title, desc);
                            console.log(title, desc);
                            this.clearInputs();
                        }
                    }
                }
                __decorate([
                    autobind_ts_1.autobind
                ], KanbanInput.prototype, "submitHandler", null);
                return KanbanInput;
            })();
            exports_6("KanbanInput", KanbanInput);
        }
    };
});
System.register("components/task-list", ["state/task-state", "models/kanban", "components/base-components"], function (exports_7, context_7) {
    "use strict";
    var task_state_ts_2, kanban_ts_2, base_components_ts_2, TaskList;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (task_state_ts_2_1) {
                task_state_ts_2 = task_state_ts_2_1;
            },
            function (kanban_ts_2_1) {
                kanban_ts_2 = kanban_ts_2_1;
            },
            function (base_components_ts_2_1) {
                base_components_ts_2 = base_components_ts_2_1;
            }
        ],
        execute: function () {
            TaskList = class TaskList extends base_components_ts_2.Component {
                constructor(type) {
                    super('task-list', 'flex-container', false, `${type}-task`);
                    this.type = type;
                    this.addedTasks = [];
                    this.configure();
                    this.renderContent();
                }
                configure() {
                    task_state_ts_2.taskState.addListener((tasks) => {
                        const relevantTasks = tasks.filter(tsk => {
                            if (this.type === "to-do") {
                                return tsk.status === kanban_ts_2.TaskStatus.ToDo;
                            }
                            else if (this.type === "in-progress") {
                                return tsk.status === kanban_ts_2.TaskStatus.InProgress;
                            }
                            else {
                                return tsk.status === kanban_ts_2.TaskStatus.Done;
                            }
                        });
                        this.addedTasks = relevantTasks;
                        this.renderTasks();
                    });
                }
                ;
                renderContent() {
                    const listId = `${this.type}-task-list`;
                    this.element.querySelector('ul').id = listId;
                    this.element.querySelector('h2').textContent =
                        this.type.toUpperCase();
                }
                renderTasks() {
                    const listElement = document.getElementById(`${this.type}-task-list`);
                    listElement.innerHTML = '';
                    for (const taskItem of this.addedTasks) {
                        const listItem = document.createElement('li');
                        listItem.textContent = taskItem.title;
                        listElement.appendChild(listItem);
                    }
                }
            };
            exports_7("TaskList", TaskList);
        }
    };
});
System.register("mod", ["components/kanban-input", "components/task-list"], function (exports_8, context_8) {
    "use strict";
    var kanban_input_ts_1, task_list_ts_1, kanbanInput, todo, inprogress, done;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (kanban_input_ts_1_1) {
                kanban_input_ts_1 = kanban_input_ts_1_1;
            },
            function (task_list_ts_1_1) {
                task_list_ts_1 = task_list_ts_1_1;
            }
        ],
        execute: function () {
            kanbanInput = new kanban_input_ts_1.KanbanInput();
            todo = new task_list_ts_1.TaskList('to-do');
            inprogress = new task_list_ts_1.TaskList('in-progress');
            done = new task_list_ts_1.TaskList('done');
        }
    };
});

__instantiate("mod");
