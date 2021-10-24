import { initialCards } from "../scripts/initial-сards.js"
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js"
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_visible'
};
//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
const popupElement = document.querySelector('.popup');

const popupCloseButtonElements = document.querySelectorAll('.popup__close');

const popupCardElement = document.querySelector('.popup_add_card');
const popupProfileElement = document.querySelector('.popup_type_profile');

const popupOpenButtonElement = document.querySelector('.profile__info-button');
const popupOpenProfileButton = document.querySelector('.profile__button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__info-name');
const jobProfile = document.querySelector('.profile__info-description');

const formElement = document.querySelector('.popup__form');
const formProfileElement = document.querySelector('.popup__form-profile');
const formCardElement = document.querySelector('.popup__form-card');
const formButton = document.querySelector('.popup__button');
const formAddButton = document.querySelector('.popup__button_add');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener("keydown", closePopupEsc);
};

popupCloseButtonElements.forEach((item) => {
    item.addEventListener('click', (event) => {
        closePopup(event.target.closest('.popup'));
    });
});

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener("keydown", closePopupEsc);
    document.addEventListener("mousedown", closePopupOvr);
};

popupOpenButtonElement.addEventListener('click', () => { openProfilePopup(popupProfileElement) });
popupOpenProfileButton.addEventListener('click', () => { openPopup(popupCardElement) });

const openProfilePopup = () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    openPopup(popupProfileElement);
}


formProfileElement.addEventListener('submit', function(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfileElement);
});

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
const closePopupOvr = ('mousedown', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target.closest('.popup'));
    }
})


// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ESC
const closePopupEsc = (event) => {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//ДОБАВЛЕНИЕ КАРТОЧЕК
const cardsElement = document.querySelector('.elements');

const cardTitle = popupCardElement.querySelector('.popup__input_type_title');
const cardLink = popupCardElement.querySelector('.popup__input_type_link');


initialCards.forEach((data) => {
    cardsElement.prepend(createCard(data));
});

function createCard(data) {
    const сard = new Card(data, '#card-template', handleImageClick);

    return сard.generateCard();
}

const postingCardHandler = (event, inactiveButtonClass) => {
    event.preventDefault();

    const сard = {
        name: cardTitle.value,
        link: cardLink.value
    };
    createCard(сard);
    cardsElement.prepend(createCard(сard));
    formCardElement.reset();
    closePopup(popupCardElement);
    formAddButton.setAttribute("disabled", true);
};

popupCardElement.addEventListener('submit', postingCardHandler);

//ОТКРЫТИЕ КАРТОЧЕК
const popupOpenBigImg = document.querySelector('.popup_type_big-img');
const popupBigImg = popupOpenBigImg.querySelector('.popup__big-size-image');
const popupBigImgName = popupOpenBigImg.querySelector('.popup__big-size-name');

function handleImageClick(name, link) {

    popupBigImg.src = link;
    popupBigImgName.textContent = name;
    popupBigImg.alt = name;

    openPopup(popupOpenBigImg);
};

//ВАЛИДАЦИЯ 
const formProfile = popupProfileElement.querySelector('.popup__form');
const formAddCard = popupCardElement.querySelector('.popup__form');

const validFormProfile = new FormValidator(validationConfig, formProfile);
validFormProfile.enableValidation();
const validFormCard = new FormValidator(validationConfig, formAddCard);
validFormCard.enableValidation();