var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Popup } from "./Popup.js";
const DEFAULT_LOADING_TEXT = "Eliminando...";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.isSubmitting = false;
        this.handleConfirm = () => { };
        this.confirmButton = this.popupElement.querySelector(".popup__button");
        this.defaultButtonText = this.confirmButton.textContent || "";
    }
    setSubmitHandler(handler) {
        this.handleConfirm = handler;
    }
    renderLoading(isLoading) {
        this.confirmButton.disabled = isLoading;
        this.confirmButton.textContent = isLoading
            ? DEFAULT_LOADING_TEXT
            : this.defaultButtonText;
    }
    setEventListeners() {
        const _super = Object.create(null, {
            setEventListeners: { get: () => super.setEventListeners }
        });
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;
            this.renderLoading(true);
            try {
                yield this.handleConfirm();
            }
            finally {
                this.isSubmitting = false;
                this.renderLoading(false);
            }
        }));
    }
}
