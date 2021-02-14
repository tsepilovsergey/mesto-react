import React from 'react';

function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : false}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form className={`popup__form popup__form-${name}`} name="formEdit" onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="popup__button" type="submit">
                        {buttonTitle}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
