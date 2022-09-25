export default function PopupWithForm({ name, isOpen, onClose, title, onSubmit, children, buttonText }) {

  return(
    <div className={`popup popup_${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className={`popup__content popup__content_${name}`}>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`popup-form-${name}`}
          id={`${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__submit-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}