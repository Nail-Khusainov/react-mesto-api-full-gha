import { Route, Routes, Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <Routes>
                <Route path="/sign-in" element={
                    <div className="header__container">
                        <a href="#" className="header__logo" target="_blank"></a>
                        <div className="header__login-bar">
                            <Link to="/sign-up" className="header__login-link">
                                Регистрация
                            </Link>
                        </div>
                    </div>
                }>
                </Route>

                <Route path="/sign-up" element={
                    <div className="header__container">
                        <a href="#" className="header__logo" target="_blank"></a>

                        <div className="header__login-bar">
                            <Link to="/sign-in" className="header__login-link">
                                Войти
                            </Link>
                        </div>
                    </div>
                }>
                </Route>

                <Route path="/" element={
                    <div className="header__container">
                        <a href="#" className="header__logo" target="_blank"></a>

                        <div className="header__login-bar">
                            <p className="header__login-email">{props.email}</p>
                            <Link
                                to="/sign-in"
                                onClick={props.onSignOut}
                                className="header__login-link"
                            >
                                Выйти
                            </Link>
                        </div>
                    </div>

                }>

                </Route>
            </Routes>
        </header>
    );
}
export default Header;


// function Header() {
//     return (
//         <header className="header">
//             <a href="#" className="header__logo" target="_blank"></a>
//         </header>
//     );
// }
// export default Header;