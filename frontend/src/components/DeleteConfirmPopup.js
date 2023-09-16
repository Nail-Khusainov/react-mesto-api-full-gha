import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup({ isOpen, onClose, onDeleteConfirm, cardId, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteConfirm(cardId);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title='Вы уверены?'
      name='card_info'
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default DeleteConfirmPopup;


