export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupAvatar = document.querySelector('.popup-avatar');
export const nameInput = popupEdit.querySelector('.popup__input_type_name');
export const descriptionInput = popupEdit.querySelector('.popup__input_type_description');

export const validityState = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
