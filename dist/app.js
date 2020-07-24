"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            console.log(userInput);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autobind
], InputForm.prototype, "submitHandler", null);
const task = new InputForm();
//# sourceMappingURL=app.js.map