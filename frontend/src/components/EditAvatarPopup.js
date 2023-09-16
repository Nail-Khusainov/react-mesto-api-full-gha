import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = React.useRef();

  const userAvatar = useContext(CurrentUserContext);

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      user_avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        name="user_avatar"
        defaultValue={userAvatar.avatar}
        ref={inputRef}
        id="avatarLink"
        type="url"
        placeholder="ссылка на картинку"
        required
      />
      <span id="error-avatarLink" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;