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

popupCloseButtonElements.forEach((item) => {
    item.addEventListener('click', (evt) => {
        togglePopup(evt.target.closest('.popup'));
    });
});

popupOpenButtonElement.addEventListener('click', () => { togglePopup(popupProfileElement) });
popupOpenProfileButton.addEventListener('click', () => { togglePopup(popupCardElement) });

const openProfilePopup = () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

popupOpenButtonElement.addEventListener('click', () => openProfilePopup(popupProfileElement));

function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup();
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

    togglePopup(popupOpenBigImg);

    const img = event.target;
    popupBigImg.src = img.src;
    const nameImg = img.parentNode.textContent;
    popupBigImgName.textContent = nameImg;
};