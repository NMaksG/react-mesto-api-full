import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
   setName(currentUser.name);
   setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return(
    <PopupWithForm 
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        required
        id="name-input"
        minLength="2"
        maxLength="40"
        className="popup__field popup__field_type_name"
        name="name"
        type="text"
        placeholder="Имя"
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
        />
      <span className="popup__error popup__error_position-name_top" id="name-input-error"></span>
      <input
        required
        id="description-input"
        minLength="2"
        maxLength="200"
        className="popup__field popup__field_type_description"
        name="about"
        type="text"
        placeholder="О себе"
        autoComplete="off"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__error popup__error_position_top" id="description-input-error"></span>
    </PopupWithForm>
  );
}