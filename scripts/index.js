const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_visible'
};
enableValidation(validationConfig);
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
}; 

popupOpenButtonElement.addEventListener('click', () => { openPopup(popupProfileElement) }); 
popupOpenProfileButton.addEventListener('click', () => { openPopup(popupCardElement) }); 

const openProfilePopup = () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

popupOpenButtonElement.addEventListener('click', () => openProfilePopup(popupProfileElement));

formProfileElement.addEventListener('submit', function(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfileElement);
});

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
document.addEventListener('mousedown', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target.closest('.popup'));
    }
});

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ESC
const closePopupEsc = (event) => {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

//ДОБАВЛЕНИЕ КАРТОЧЕК
const cardsElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#card-template').content;

const cardTitle = popupCardElement.querySelector('.popup__input_type_title');
const cardLink = popupCardElement.querySelector('.popup__input_type_link');


const removeCardHandler = (event) => {
    event.target.closest('.card').remove();
}

function likeClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__button_active');
}

const createCard = (data) => {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__img');
    cardImgElement.src = data.link;
    cardImgElement.alt = data.name;
    cardElement.querySelector('.card__name').textContent = data.name;
    cardElement.querySelector('.card__delete').addEventListener('click', removeCardHandler);
    cardElement.querySelector('.card__button').addEventListener('click', likeClick);
    cardImgElement.addEventListener('click', () => openBigImgPopup(data));

    return cardElement;
}

const addCard = (data) => {
    cardsElement.prepend(createCard(data)); 
}

const postingCardHandler = (event) => {
    event.preventDefault();

    addCard({
        name: cardTitle.value,
        link: cardLink.value
    });
    formCardElement.reset();
    closePopup(popupCardElement);
};

popupCardElement.addEventListener('submit', postingCardHandler);

initialCards.forEach((card) => {
    addCard(card);
});

//ОТКРЫТИЕ КАРТОЧЕК
const popupOpenBigImg = document.querySelector('.popup_type_big-img');
const popupBigImg = popupOpenBigImg.querySelector('.popup__big-size-image');
const popupBigImgName = popupOpenBigImg.querySelector('.popup__big-size-name');

function openBigImgPopup(data) {

    popupBigImg.src = data.link;
    popupBigImgName.textContent = data.name;
    popupBigImg.alt = data.name;
    
    openPopup(popupOpenBigImg);
};