import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    open({ link, name }) {
        this._popupElement.querySelector('.popup__big-size-name').textContent = name;
        const imgElement = this._popupElement.querySelector('.popup__big-size-image');
        imgElement.src = link;
        imgElement.alt = `Изображение ${name}`;

        super.open();
    }
}