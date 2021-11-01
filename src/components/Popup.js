export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._hendleEscClose = this._hendleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._hendleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._hendleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }

    _hendleEscClose(event) {
        event.preventDefault();

        if (event.key === 'Escape') {
            this.close();
        }
    }


}