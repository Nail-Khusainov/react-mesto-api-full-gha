function InfoTooltip({ isOpen, onClose, image, caption }) {
    const classNames = `popup ${isOpen ? "popup_opened" : ""}`;

    return (
        <div className={classNames}>
            <div className="popup__container infoTooltip__container">
                <button
                    className="popup__close-button"
                    type="button"
                    onClick={onClose}
                ></button>

                <img
                    src={image}
                    alt={caption}
                    className="infoTooltip__image"
                ></img>
                <p className="popup__title infoTooltip__caption">{caption}</p>
            </div>
        </div>
    )
};

export default InfoTooltip;