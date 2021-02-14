import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete, isLoading }) {
    const submitButton = isLoading ? 'Удаление...' : 'Да';

    function handleSubmit(event) {
        event.preventDefault();

        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name={'confirm'}
            title={'Вы уверены?'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle={submitButton}
        >
        </PopupWithForm>
    );
}

export default DeleteCardPopup;
