import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this.form = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this.form.reset();

        super.close();
    }

    setEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this._handleFormSubmit(this._getInputValues());
            this.close()
        });

        super.setEventListeners();
    }

    _getInputValues() {
        const formValues = {};
        const inputList = Array.from(this.form.querySelectorAll('.popup__input'));
        inputList.forEach(input => formValues[input.name] = input.value);

        return formValues;
    }
}