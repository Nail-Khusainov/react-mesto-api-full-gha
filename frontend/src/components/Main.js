import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar">
                        <img className="profile__image" src={currentUser.avatar} alt="аватар" />
                        <button
                            className="profile__avatar-edit-btn"
                            onClick={onEditAvatar}
                            type="button"
                        >
                        </button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name" id="profile_name">{currentUser.name}</h1>
                        <button
                            className="button open-popup-button profile__edit-button"
                            onClick={onEditProfile}
                            type="button"
                        >
                        </button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="button open-popup-button profile__add-button"
                    onClick={onAddPlace}
                    type="button"
                >
                </button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.length && cards.map((card) => (
                        <Card
                            link={card.link}
                            name={card.name}
                            likes={card.likes}
                            owner={card.owner}
                            id={card._id}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}
export default Main;