import '../pages/index.css';
import { initialCards } from "../utils/constants.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {validationConfig}  from "../utils/constants.js";
import { cardSelectors } from "../utils/constants.js";
import { profileSelectors } from "../utils/constants.js";


const imagePopup = new PopupWithImage(cardSelectors.imageSelector);
imagePopup.setEventListeners();

const handleCardClick = ({ link, name }) => {
    imagePopup.open({ link, name });
}
const createCard = (data) => {
    const card = new Card(data, cardSelectors.templateSelector, handleCardClick);
    return card.generateCard();
};

const renderer = (data) => {
    const card = createCard(data);
    cardList.addItem(card);
}
const cardList = new Section({ items: initialCards, renderer: renderer }, cardSelectors.elementsSelector);
cardList.renderItems();

//ПОПАП ПРОФИЛЯ
/// инфа о пользователе
const userInfo = new UserInfo({
    userName: profileSelectors.userNameSelector,
    userJob: profileSelectors.userJobSelector
});
///попап редактирования профиля 
const handleUserInfoFormSubmit = (data) => {
    userInfo.setUserInfo(data);
    userInfoPopup.close();
}
const userInfoPopup = new PopupWithForm(profileSelectors.popupProfileSelector, handleUserInfoFormSubmit);
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

const validFormProfile = new FormValidator(validationConfig, userInfoPopup.form);
validFormProfile.enableValidation();

//ПОПАП КАРТОЧКИ
const handleCardFormSubmit = (data) => {
    cardList.addItem(createCard(data));
}
const newCardPopup = new PopupWithForm(cardSelectors.popupCardSelector, handleCardFormSubmit);
newCardPopup.setEventListeners();

const popupOpenProfileButton = document.querySelector('.profile__button');
popupOpenProfileButton.addEventListener('click', () => {
    validFormCard.toggleButtonState();
    newCardPopup.open();
});

const validFormCard = new FormValidator(validationConfig, newCardPopup.form);
validFormCard.enableValidation();