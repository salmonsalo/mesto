export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const elementTemplate = document.querySelector('#card-template').content;
        const cardElement = elementTemplate.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getElement();
        this._setEventListeners();

        const cardImg = this._element.querySelector('.card__img');

        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;
    }

    _removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    _likeCard(event) {
        event.target.classList.toggle('card__button_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', this._removeCard);
        this._element.addEventListener('click', this._likeCard);
        this._element.querySelector('.card__img').addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }

}