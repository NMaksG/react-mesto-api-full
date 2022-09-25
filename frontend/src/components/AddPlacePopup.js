import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);
  
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return(
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        required
        id="title-input"
        minLength="2"
        maxLength="30"
        className="popup__field popup__field_type_title"
        name="name"
        type="text"
        placeholder="Название"
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error popup__error_position-name_top" id="title-input-error"></span>
      <input
        required
        id="link-input"
        className="popup__field popup__field_type_link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__error popup__error_position_top" id="link-input-error"></span>
    </PopupWithForm>
  );
}