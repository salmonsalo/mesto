const popupOpenButtonElement = document.querySelector('.profile__info-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');


const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__info-name');
const jobProfile = document.querySelector('.profile__info-description');

const formElement = document.querySelector('.popup__form');
const formButton = document.querySelector('.popup__button');

function togglePopup() {
    if (!popupElement.classList.contains('popup_opened')) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
    }
    popupElement.classList.toggle('popup_opened');
}

popupOpenButtonElement.addEventListener('click', togglePopup);
popupCloseButtonElement.addEventListener('click', togglePopup);

popupElement.addEventListener('click', togglePopup);

document.querySelector('.popup__container').addEventListener('click', function(event) { event.stopPropagation(); });

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup();
});