export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector)); //???
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    _showInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._validationConfig.errorClass);
    }

    hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        this._errorElement.remove(this._validationConfig.errorClass)
        this._errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this.hideInputError(inputElement)
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((input) => !input.validity.valid);
    }

    _hasNotInputValues() {
        return this._inputList.every((input) => {
            return input.value.lenght === 0;
        });
    }

    _disableSubmitButton = () => {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "disabled");
    }

    _enableSubmitButton = () => {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    }

    toggleButtonState = () => {
        if (this._hasInvalidInput() || this._hasNotInputValues()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _setEventListeners = () => {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener(('input'), () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });

        this.toggleButtonState();
    }

    enableValidation() {
        this._setEventListeners();
    }
}