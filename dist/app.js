"use strict";
var InputForm = (function () {
    function InputForm() {
        this.templateElement = document.querySelector("#input-form");
        this.targetElement = document.querySelector("#target");
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.attach();
    }
    InputForm.prototype.attach = function () {
        this.targetElement.insertAdjacentElement("afterbegin", this.element);
    };
    return InputForm;
}());
var task = new InputForm();
//# sourceMappingURL=app.js.map