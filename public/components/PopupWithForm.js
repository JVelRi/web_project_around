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
const DEFAULT_LOADING_TEXT = "Guardando...";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.isSubmitting = false;
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.inputElements = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.defaultButtonText = this.submitButton.textContent || "";
    }
    getInputValues() {
        const values = {};
        this.inputElements.forEach((inputElement) => {
            values[inputElement.name] = inputElement.value;
        });
        return values;
    }
    renderLoading(isLoading) {
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading
            ? DEFAULT_LOADING_TEXT
            : this.defaultButtonText;
    }
    setEventListeners() {
        const _super = Object.create(null, {
            setEventListeners: { get: () => super.setEventListeners }
        });
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;
            this.renderLoading(true);
            try {
                yield this.handleFormSubmit(this.getInputValues());
            }
            finally {
                this.isSubmitting = false;
                this.renderLoading(false);
            }
        }));
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
