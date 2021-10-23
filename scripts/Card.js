export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getElement() {
        const elementTemplate = document.querySelector('#card-template').content;
        const cardElement = elementTemplate.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getElement();
        this._setEventListeners();

        this._element.querySelector('.card__img').src = this._link;
        this._element.querySelector('.card__img').alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;
    }

    _removeCard = () => {
        this._element.closest('.card').remove();
    }

    _likeCard() {
        this._element.querySelector('.card__button').classList.toggle('card__button_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', (event) => {
            this._removeCard(event);
        });
        this._element.addEventListener('click', (event) => {
            this._likeCard(event);
        });
        this._element.querySelector('.card__img').addEventListener('click', () => {
            this._handleImageClick(this._name, this._link);
        });
    }

}