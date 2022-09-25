import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const inputRef = React.useRef('');

  React.useEffect(() => {
    inputRef.current.value = '';
   }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
          required
          id="link-avatar"
          className="popup__field popup__field_type_link-avatar"
          name="link"
          type="url"
          placeholder="Ссылка на фото"
          autoComplete="off"
          ref={inputRef}
      />
      <span className="popup__error popup__error_position-name_top" id="link-avatar-error"></span>
    </PopupWithForm>
  )
}