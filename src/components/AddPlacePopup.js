import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const submitButton = isLoading ? 'Сохранение...' : 'Создать';

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            name={'add'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle={submitButton}
        >
            <input value={name || ''} onChange={handleNameChange} className="popup__input popup__input_type_title" name="popupTitle" type="text" id="title" autoComplete="off" placeholder="Название" minLength="2" maxLength="30" required />
            <span id="title-error"></span>
            <input value={link || ''} onChange={handleLinkChange} className="popup__input popup__input_type_link" name="popupLink" type="url" id="link" autoComplete="off" placeholder="Ссылка на картинку" required />
            <span id="link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
