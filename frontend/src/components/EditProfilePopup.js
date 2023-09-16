import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { usePopupClose } from "../hooks/usePopupClose";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      user_name: name,
      user_about: about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="popup__input_type_name"
        name="user_name"
        type="text"
        placeholder="ваше имя"
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span id="error-popup__input_type_name" className="popup__input-error"></span>

      <input
        className="popup__input popup__input_type_job"
        id="popup__input_type_job"
        name="user_about"
        type="text"
        placeholder="ваша профессия"
        value={about}
        onChange={handleAboutChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span id="error-popup__input_type_job" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;