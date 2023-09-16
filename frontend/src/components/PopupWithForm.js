import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
    name,
    title,
    buttonText,
    isOpen,
    onClose,
    onSubmit,
    children
}) {
    const nameOfClass = `popup popup-${name} ${isOpen ? "popup_opened" : ""}`;

    usePopupClose(isOpen, onClose)

    return (
        <div className={nameOfClass}>
            <div className="popup__container">
                <button
                    className="button popup__close-button"
                    type="button"
                    onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>

                <form
                    className="popup__form"
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        className="button popup__submit-button"
                        type="submit"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
