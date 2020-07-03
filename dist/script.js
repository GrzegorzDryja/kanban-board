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
            isValid = isValid && validatableInput.value.toString().trim().length !== 0; //value could be string
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
System.register("components/kanban-input", ["decorators/autobind", "util/validation"], function (exports_3, context_3) {
    "use strict";
    var autobind_ts_1, Validation, KanbanInput;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (autobind_ts_1_1) {
                autobind_ts_1 = autobind_ts_1_1;
            },
            function (Validation_1) {
                Validation = Validation_1;
            }
        ],
        execute: function () {
            KanbanInput = /** @class */ (() => {
                class KanbanInput {
                    constructor() {
                        this.templateElement = document.getElementById('task-input');
                        this.hostElement = document.getElementById('app');
                        const importedNode = document.importNode(this.templateElement.content, true);
                        this.element = importedNode.firstElementChild;
                        this.element.id = 'user-input';
                        this.titleInputElement = this.element.querySelector('#title');
                        this.descriptionInputElement = this.element.querySelector('#description');
                        this.configure();
                        this.attach();
                    }
                    allyUserInput() {
                        const enteredTitle = this.titleInputElement.value; //Note that always return text
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
                        event.preventDefault(); //To block http request
                        const userInput = this.allyUserInput();
                        if (Array.isArray(userInput)) { //Check ts tuple in js
                            const [title, desc] = userInput;
                            console.log(title, desc);
                            this.clearInputs();
                        }
                    }
                    configure() {
                        this.element.addEventListener('submit', this.submitHandler); //Have to call it with bind witch is in decorator
                    }
                    attach() {
                        this.hostElement.insertAdjacentElement('afterbegin', this.element);
                    }
                }
                __decorate([
                    autobind_ts_1.autobind
                ], KanbanInput.prototype, "submitHandler", null);
                return KanbanInput;
            })();
            exports_3("KanbanInput", KanbanInput);
        }
    };
});
System.register("components/task-list", [], function (exports_4, context_4) {
    "use strict";
    var TaskList;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            TaskList = class TaskList {
                constructor(type) {
                    this.type = type;
                    this.templateElement = document.getElementById('task-list');
                    this.hostElement = document.getElementById('flex-container');
                    const importedNode = document.importNode(this.templateElement.content, true);
                    this.element = importedNode.firstElementChild;
                    this.element.id = `${this.type}-task`;
                    this.attach();
                    this.renderContent();
                }
                renderContent() {
                    const listId = `${this.type}-task-list`;
                    this.element.querySelector('ul').id = listId;
                    this.element.querySelector('h2').textContent =
                        this.type.toUpperCase();
                }
                attach() {
                    this.hostElement.insertAdjacentElement('beforeend', this.element);
                }
            };
            exports_4("TaskList", TaskList);
        }
    };
});
System.register("mod", ["components/kanban-input", "components/task-list"], function (exports_5, context_5) {
    "use strict";
    var kanban_input_ts_1, task_list_ts_1, kanbanInput, todo, inprogress, done;
    var __moduleName = context_5 && context_5.id;
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
            todo = new task_list_ts_1.TaskList('todo');
            inprogress = new task_list_ts_1.TaskList('inprogress');
            done = new task_list_ts_1.TaskList('done');
        }
    };
});

__instantiate("mod");
