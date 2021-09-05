const popupOpenButtonElement = document.querySelector('.profile__info-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__description');
const nameProfile = document.querySelector('.profile__info-name');
const jobProfile = document.querySelector('.profile__info-description');

const formElement = document.querySelector('.popup__form');
const formButton = document.querySelector('.popup__button');

function togglePopup() {
    if (!popupElement.classList.contains('popup__is-opened')) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
    }
    popupElement.classList.toggle('popup__is-opened');
}

popupOpenButtonElement.addEventListener('click', togglePopup);
popupCloseButtonElement.addEventListener('click', togglePopup);

popupElement.addEventListener('click', togglePopup);

document.querySelector('.popup__container').addEventListener('click', function(event) { event.stopPropagation(); });

formElement.addEventListener('submit', function(event) { event.preventDefault(); });


//like
function likeClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__button_active');
}

const likeButtons = document.querySelectorAll('.card__button');
likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', likeClick);
});