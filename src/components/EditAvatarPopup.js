import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = React.useRef();
    const submitButton = isLoading ? 'Сохранение...' : 'Обновить';

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle={submitButton}
        >
            <input ref={avatarRef} className="popup__input popup__input_type_link" name="popupAvatar" type="url" id="avatar" autoComplete="off" placeholder="Ссылка на картинку" required />
            <span id="avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
