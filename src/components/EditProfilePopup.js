import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    const submitButton = isLoading ? 'Сохранение...' : 'Сохранить';

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name={'edit'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle={submitButton}
        >
            <input value={name || ''} onChange={handleNameChange} className="popup__input popup__input_type_name" name="popupName" type="text" id="name" autoComplete="off" placeholder="Имя" minLength="2" maxLength="40" required />
            <span id="name-error"></span>
            <input value={description || ''} onChange={handleDescriptionChange} className="popup__input popup__input_type_description" name="popupDescription" type="text" id="description" autoComplete="off" placeholder="О себе" minLength="2" maxLength="200" required />
            <span id="description-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
