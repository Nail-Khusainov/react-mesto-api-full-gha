import React, { useState } from "react";

function Login(props) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        props.onLogin(email, password);
    }

    return (
            <div className="login-container">
                <form onSubmit={handleSubmit} className="popup__form">
                <h2 className="popup__title">Вход</h2>
                    
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
                        <button className="button popup__submit-button popup__submit-buton_theme-dark" type="submit">Войти</button>
                </form>
            </div>
        
    )
}

export default Login;