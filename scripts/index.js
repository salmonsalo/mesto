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
const formButton = document.querySelector('.popup__button');

const openPopup = (popupElement) => { 
    popupElement.classList.add('popup_opened'); 
}; 

popupCloseButtonElements.forEach((item) => { 
    item.addEventListener('click', (evt) => { 
        closePopup(evt.target.closest('.popup')); 
    }); 
}); 

function closePopup(popupElement) { 
    popupElement.classList.remove('popup_opened'); 
}; 

popupOpenButtonElement.addEventListener('click', () => { openPopup(popupProfileElement) }); 
popupOpenProfileButton.addEventListener('click', () => { openPopup(popupCardElement) }); 

const openProfilePopup = () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

popupOpenButtonElement.addEventListener('click', () => openProfilePopup(popupProfileElement));

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
});

// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
document.addEventListener('mousedown', (event) => {
    event.stopPropagation();
    if (!event.target.closest('.popup__container')) {
      popupProfileElement.classList.remove('popup_opened');
      popupCardElement.classList.remove('popup_opened');
      popupOpenBigImg.classList.remove('popup_opened');
    }
  });
// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ESC
document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        popupProfileElement.classList.remove('popup_opened');
        popupCardElement.classList.remove('popup_opened');
        popupOpenBigImg.classList.remove('popup_opened');
    }
});
//ДОБАВЛЕНИЕ КАРТОЧЕК
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#card-template').content;


const removeCardHandler = (event) => {
    event.target.closest('.card').remove();
}

function likeClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__button_active');
}

const addCard = (data) => {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__img');
    cardImgElement.src = data.link;
    cardImgElement.alt = 'Изображение';
    cardElement.querySelector('.card__name').textContent = data.name;
    cardElement.querySelector('.card__delete').addEventListener('click', removeCardHandler);
    cardElement.querySelector('.card__button').addEventListener('click', likeClick);
    cardImgElement.addEventListener('click', openBigImgPopup);

    cardsElement.prepend(cardElement);
}

const cardTitle = popupCardElement.querySelector('.popup__input_type_title');
const cardLink = popupCardElement.querySelector('.popup__input_type_link');

const postingCardHandler = (event) => {
    event.preventDefault();

    addCard({
        name: cardTitle.value,
        link: cardLink.value
    });

    popupCardElement.classList.toggle('popup_opened');
};

popupCardElement.addEventListener('submit', postingCardHandler);

initialCards.forEach((card) => {
    addCard(card);
});

//ОТКРЫТИЕ КАРТОЧЕК
const popupOpenBigImg = document.querySelector('.popup_type_big-img');
const popupBigImg = popupOpenBigImg.querySelector('.popup__big-size-image');
const popupBigImgName = popupOpenBigImg.querySelector('.popup__big-size-name');

function openBigImgPopup(event) {

    openPopup(popupOpenBigImg);

    const img = event.target;
    popupBigImg.src = img.src;
    const nameImg = img.parentNode.textContent;
    popupBigImgName.textContent = nameImg;
};