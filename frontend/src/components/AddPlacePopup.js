import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const {values, handleChange, setValues} = useForm({name:'', link:''});

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values);
    }

    useEffect(() => {
        setValues({name:'', link:''})
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card-add"
            title="Новое место"
            buttonText={isLoading ? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_title"
                id="cardtitle"
                name="name"
                type="text"
                placeholder="название"
                value={values.name}
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                required
            />
            <span id="error-cardtitle" className="popup__input-error"></span>

            <input
                className="popup__input popup__input_type_link"
                name="link"
                id="cardlink"
                type="url"
                placeholder="ссылка на картинку"
                value={values.link}
                onChange={handleChange}
                required
            />
            <span id="error-cardlink" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;