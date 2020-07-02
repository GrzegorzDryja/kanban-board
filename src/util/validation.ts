export interface Validatable {
    value: string | number;
    required?: boolean;//? = boolean | undefined
    minLength?: number;
    maxLength?: number;
  }

export function validate(validatableInput: Validatable) {
let isValid = true;
if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0; //value could be string
}
if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
) {
    isValid =
    isValid && validatableInput.value.length >= validatableInput.minLength;
}
if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
) {
    isValid =
    isValid && validatableInput.value.length <= validatableInput.maxLength;
}
return isValid;
}
