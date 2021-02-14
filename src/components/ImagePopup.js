import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup-image ${isOpen ? 'popup_opened' : false}`}>
            <div className="popup__container-image">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__fulled-image" src={card.link} alt={card.title} />
                <h3 className="popup__title-image">{card.title}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;
