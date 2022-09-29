import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements-item__del ${!isOwn && 'elements-item__del-disable'}`
  );

  const isLiked = card.likes.some((item) => item === currentUser._id);
  const cardLikeButtonClassName = (
    `elements-item__like ${isLiked && 'elements-item__like_active'}`
  ); 

  function openPopupImage() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function onDelCard(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return(
    <li className="elements-item">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={onDelCard}
        >
      </button>
      <img
        className="elements-item__img elements-item__img_template"
        src={card.link}
        alt={card.name}
        onClick={openPopupImage}
        />
      <div className="elements-item__group">
        <h2 className="elements-item__title elements-item__title_template">{card.name}</h2>
        <div>
        <button
          className={cardLikeButtonClassName}
          type="button" aria-label="Лайк"
          onClick={handleLikeClick}          
        >
        </button>
        <p className="elements-item__like-numb">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}