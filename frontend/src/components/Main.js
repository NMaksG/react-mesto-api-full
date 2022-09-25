import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../context/CurrentUserContext.js';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardLike, onCardClick, onCardDelete, cards}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  
  function handleOpenPopupEdit() { 
    onEditProfile();
  }
  function handleOpenPopupAdd() { 
    onAddPlace();
  }
  function handleOpenPopupAvatar() { 
    onEditAvatar();
  }

  return(
    <main className="content">
      <section className="profile">
        <a
          href="##"
          className="profile__edit-avatar"
          onClick={handleOpenPopupAvatar}
        >
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
        </a>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={handleOpenPopupEdit}
            >
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={handleOpenPopupAdd}
        >
        </button>
      </section>
      <section className="elements">
        <ul className="elements__element elements__element_template">
          { cards.map((item) =>
          (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
          ) }
        </ul>
      </section>
    </main>
  );
}