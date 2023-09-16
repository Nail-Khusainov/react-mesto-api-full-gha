import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ 
    link,
    name, 
    likes,
    owner,
    id, 
    onCardClick,
    onCardLike,
    onCardDelete,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = owner._id === currentUser._id;
    const isLiked = likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = ( 
        `button elements__like-button ${isLiked && 'elements__like-button_active'}` 
    );

    function handleCardClick() {
        onCardClick( {link, name} );
    };

    function handleLikeClick() {
        onCardLike( {likes, id} )
    }

    function handleDeleteClick() {
        onCardDelete ( {id} )
    }

    return (
        <li className="elements__card">
            <img className="elements__image" src={link} alt={name} onClick={handleCardClick} />
            {isOwn && (<button className="button elements__delete-button" type="button" onClick={handleDeleteClick}></button>)}
            <div className="elements__card-info">
                <h2 className="elements__card-title">{name}</h2>
                <div className="elements__likes-section">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="elements__likes-counter">{likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;