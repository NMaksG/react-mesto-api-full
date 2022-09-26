import React, { useEffect, useState } from "react";

import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from './ImagePopup.js';
import api from "../utils/Api.js";
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/auth.js'


function App() {

  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [userInfo, setUserInfo] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if(loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
        
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
        }
    }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item === currentUser._id);
    api.setLikeCard(card, isLiked)
    .then((res) => {
      setCards((cards) => cards.map((item) => item._id === card._id ? res : item));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.delCard(card)
    .then((res) => {
      setCards((cards) => cards.filter((item) => !(item._id === card._id) && res));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCards({name, link})
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function tokenCheck() {
    auth.getContent()
      .then((res) => {
        setUserInfo(res.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);
  
  function handleLogin(data) {
    return auth.authorize(data)
    .then((res) => {
      setUserInfo(data.email);
      setLoggedIn(true);
    })
    .catch((err) => {
      setIsInfoTooltipPopupOpen(true);
      setIsInfoTooltip(false);
      console.log(err);
    });
  }

  function handleRegister(data) {
    return auth.register(data)
    .then(() => {
      setIsInfoTooltipPopupOpen(true);
      setIsInfoTooltip(true)
      history.push('/sign-in');
    })
    .catch((err) => {
      setIsInfoTooltipPopupOpen(true);
      setIsInfoTooltip(false);
      console.log(err);
    });
  }

  function handleLogout() {
    return auth.logout()
    .then((res) => {
      history.push('/sign-in');
      setLoggedIn(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userData={userInfo}
          onLogout={handleLogout}
          onMenuClick={handleMenuOpen}
          onMenuCloseClick={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
      <Switch>
        <ProtectedRoute 
          exact path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <InfoTooltip
        okText="Вы успешно зарегистрировались!"
        errorText="Что-то пошло не так! Попробуйте ещё раз."
        isOpen={isInfoTooltipPopupOpen}
        isInfoTooltip={isInfoTooltip}
        onClose={closeAllPopups}
      />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
