export default function ImagePopup({ card, onClose }) {

  return(
    <div className={`popup popup_view ${card ? 'popup_active' : ''}`}>
      <div className="popup__content popup__content_view">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__img popup__img_view" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <p className="popup__title popup__title_view">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}