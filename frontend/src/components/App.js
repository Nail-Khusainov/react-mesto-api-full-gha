import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { register, authorize, userTokenCheck, signOut } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import imageSuccess from '../images/LoginOk.png';
import imageFail from '../images/LoginFail.png';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cards, setCards] = useState([]);
  const [selectedDeleteCardId, setSelectedDeleteCardId] = useState(null);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const captionFail = "Что-то пошло не так! Попробуйте ещё раз.";
  const captionRegSuccess = "Вы успешно зарегистрировались!";
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipImage, setTooltipImage] = useState("");
  const [tooltipCaption, setTooltipCaption] = useState("");

  const tokenCheck = () => {
    userTokenCheck()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate("/", { replace: true });
        }
      })
      .catch(console.error);
  };

  React.useEffect(tokenCheck, [navigate]);

  function onLogin(email, password) {
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsTooltipOpen(true);
        setTooltipCaption(captionFail);
        setTooltipImage(imageFail);
      })
  };


  function onRegister(email, password) {
    register(email, password)
      .then(() => {
        navigate("sign-in", { replace: true });
        setIsTooltipOpen(true);
        setTooltipCaption(captionRegSuccess);
        setTooltipImage(imageSuccess);
      })
      .catch((error) => {
        setIsTooltipOpen(true);
        setTooltipCaption(captionFail);
        setTooltipImage(imageFail);
      });
  };

  function onSignOut() {
    signOut()
      .catch(console.error);
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards)
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function closeTooltip() {
    setIsTooltipOpen(false)
  }

  function handleDeleteClick(id) {
    setIsDeleteConfirmPopupOpen(true);
    setSelectedDeleteCardId(id);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  // универсальная функция, которая принимает функцию запроса
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userData) {
    function makeRequest() {
      return api
        .setNewUserInfo(userData)
        .then((userData) => {
          setCurrentUser(userData);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete({ id }) {
    function makeRequest() {
      return api
        .deleteCard(id)
        .then(() => {
          setCards(cards => {
            const filterCards = cards.filter(card => card._id !== id);
            return filterCards;
          });
        });
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api
        .setAvatar(data)
        .then((data) => {
          setCurrentUser(data);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlace({ name, link }) {
    function makeRequest() {
      return api
        .setCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleCardLike({ likes, id }) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === id ? newCard : c));
      })
      .catch(console.error)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={email} onSignOut={onSignOut} />

          <Routes>

            <Route
              path='/sign-up'
              element={
                <Register
                  onRegister={onRegister}
                />
              }
            />

            <Route
              path='/sign-in'
              element={
                <Login
                  onLogin={onLogin}
                />
              }
            />

            <Route

              path='/'
              element={
                <ProtectedRoute
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  cards={cards}
                  isLoggedIn={isLoggedIn}

                />
              }
            />

          </Routes>

          <InfoTooltip
            isOpen={isTooltipOpen}
            image={tooltipImage}
            caption={tooltipCaption}
            onClose={closeTooltip}
          />


          <Footer />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />

          <DeleteConfirmPopup
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteConfirm={handleCardDelete}
            cardId={selectedDeleteCardId}
            isLoading={isLoading}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

