import { useState, useEffect } from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {

    usePopupClose(card?.link, onClose)

    const [lastLink, setLastLink] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => { //доработать
        if (card.link !== "" && card.name !== "") {
            setLastLink(card.link)
            setLastName(card.name)
        }
    }, [card]);

    return (
        <div className={`popup popup-pic ${card.link && "popup_opened"}`} > 
            <div className="popup-pic__content">
                <button
                    className="button popup__close-button"
                    type="button"
                    onClick={onClose}
                ></button>
                <figure className="popup-pic__figure">
                    <img
                        className="popup-pic__image"
                        src={lastLink}
                        alt={card.name}
                    />
                    <figcaption className="popup-pic__caption">{lastName}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;