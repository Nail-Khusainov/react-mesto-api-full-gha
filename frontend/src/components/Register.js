import React, { useState } from "react";
import { Link } from "react-router-dom"

function Register({ onRegister }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        onRegister(email, password);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="popup__form" name="card_info">
                <h2 className="popup__title">Регистрация</h2>
                
                <input
                    className="popup__input popup__input_type_title popup__input_theme_dark"
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    minLength="2"
                    maxLength="30"
                    required
                />
                {/* <span id="error-cardtitle" className="popup__input-error"></span> */}

                <input
                    className="popup__input popup__input_type_link popup__input_theme_dark"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="30"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                {/* <span id="error-cardlink" className="popup__input-error"></span> */}
                <button className="button popup__submit-button popup__submit-buton_theme-dark" type="submit" >Зарегистрироваться</button>
                <p className="login-container__bar">
                    Уже зарегистрированы?
                    <Link className="login-container__link" to="/sign-in">Войти</Link>
                </p>
            </form>
        </div>

    )
}

export default Register;
