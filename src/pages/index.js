import '../pages/index.css';
import { initialCards } from "../components/initial-сards.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_visible'
};


const imagePopup = new PopupWithImage('.popup_type_big-img');
imagePopup.setEventListeners();

const handleCardClick = ({ link, name }) => {
    imagePopup.open({ link, name });
}
const createCard = (data) => {
    const card = new Card(data, '#card-template', handleCardClick);
    return card.generateCard();
};

const renderer = (data) => {
    const card = createCard(data);
    cardList.addItem(card);
}
const cardList = new Section({ items: initialCards, renderer: renderer }, '.elements');
cardList.renderItems();

//ПОПАП ПРОФИЛЯ
/// инфа о пользователе
const userInfo = new UserInfo({
    userName: '.profile__info-name',
    userJob: '.profile__info-description'
});
///попап редактирования профиля 
const handleUserInfoFormSubmit = (data) => {
    userInfo.setUserInfo(data);
    userInfoPopup.close();
}
const userInfoPopup = new PopupWithForm('.popup_type_profile', handleUserInfoFormSubmit);
userInfoPopup.setEventListeners();

const handleProfileButton = () => {
    const data = userInfo.getUserInfo();
    for (let key in data) {
        userInfoPopup.form.elements[key].value = data[key];
    }
    validFormProfile.toggleButtonState();
    userInfoPopup.open();
}
const popupOpenButtonElement = document.querySelector('.profile__info-button');
popupOpenButtonElement.addEventListener('click', handleProfileButton);

//ВАЛИДАЦИЯ 
const popupCardElement = document.querySelector('.popup_add_card');
const formAddCard = popupCardElement.querySelector('.popup__form');

const validFormProfile = new FormValidator(validationConfig, userInfoPopup.form);
validFormProfile.enableValidation();
const validFormCard = new FormValidator(validationConfig, formAddCard);
validFormCard.enableValidation();

//ПОПАП КАРТОЧКИ
const handleCardFormSubmit = (data) => {
    cardList.addItem(createCard(data));
}
const newCardPopup = new PopupWithForm('.popup_add_card', handleCardFormSubmit);
newCardPopup.setEventListeners();

const popupOpenProfileButton = document.querySelector('.profile__button');
popupOpenProfileButton.addEventListener('click', () => {
    validFormCard.toggleButtonState();
    newCardPopup.open();
});