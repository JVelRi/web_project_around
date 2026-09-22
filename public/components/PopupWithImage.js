import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageElement = this.popupElement.querySelector(".popup__image");
        this.captionElement = this.popupElement.querySelector(".popup__caption");
    }
    open(data) {
        this.imageElement.src = data.link;
        this.imageElement.alt = data.name;
        this.captionElement.textContent = data.name;
        super.open();
    }
}
