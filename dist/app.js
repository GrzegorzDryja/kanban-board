"use strict";
var InputForm = (function () {
    function InputForm() {
        this.templateElement = document.querySelector("#input-form");
        this.targetElement = document.querySelector("#target");
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.taskInput = this.element.querySelector("#task");
        this.configure();
        this.attach();
    }
    InputForm.prototype.submitHandler = function (event) {
        event.preventDefault();
        console.log(this.taskInput.value);
    };
    InputForm.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    };
    InputForm.prototype.attach = function () {
        this.targetElement.insertAdjacentElement("afterbegin", this.element);
    };
    return InputForm;
}());
var task = new InputForm();
//# sourceMappingURL=app.js.map