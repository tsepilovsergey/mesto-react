import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, link, name, likes, owner,  onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const card = {
        _id: _id,
        link: link,
        name: name,
        owner: owner,
        likes: likes,
    };

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardDeleteButtonClassName = `element__trash ${isOwn ? '' : 'element__trash_hidden'}`;
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    function handleClick() {
        onCardClick({
            link: link,
            name: name,
        });
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
            <img className="element__image" src={link} alt={name} onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{name}</h2>
                <div className="element__likes">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                    <p className="element__likes-number">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
