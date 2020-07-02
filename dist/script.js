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
System.register("components/kanban-input", ["decorators/autobind"], function (exports_2, context_2) {
    "use strict";
    var autobind_ts_1, KanbanInput;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (autobind_ts_1_1) {
                autobind_ts_1 = autobind_ts_1_1;
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
                    submitHandler(event) {
                        event.preventDefault(); //To block http request
                        console.log(this.titleInputElement.value);
                    }
                    configure() {
                        this.element.addEventListener('submit', this.submitHandler); //Have to call it with bind
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
            exports_2("KanbanInput", KanbanInput);
        }
    };
});
System.register("mod", ["components/kanban-input"], function (exports_3, context_3) {
    "use strict";
    var kanban_input_ts_1, kanbanInput;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (kanban_input_ts_1_1) {
                kanban_input_ts_1 = kanban_input_ts_1_1;
            }
        ],
        execute: function () {
            kanbanInput = new kanban_input_ts_1.KanbanInput();
        }
    };
});

__instantiate("mod");
