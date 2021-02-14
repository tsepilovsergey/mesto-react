import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import PopupClose from './PopupClose.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ 
      isOpen: true, 
      link: card.link, 
      title: card.name, 
    });
  }
  
  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setLoading(false);
    setDeleteCardPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api.editProfile({ name, about })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setLoading(true);
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api.editAvatar({ avatar })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    setLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.deleteLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  React.useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardPopup 
          card={cardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <PopupClose>
          <ImagePopup 
            card={selectedCard}
            isOpen={selectedCard.isOpen}
            onClose={closeAllPopups} 
          />
        </PopupClose>

        <Footer />
      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
