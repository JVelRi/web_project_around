import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this.currentItem = null;
        this.handleConfirm = handleConfirm;
        this.confirmButton = this.popupElement.querySelector(".popup__button");
    }
    open(item) {
        this.currentItem = item;
        super.open(item);
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => {
            if (this.currentItem !== null) {
                this.handleConfirm(this.currentItem, this.confirmButton);
            }
        });
    }
}
