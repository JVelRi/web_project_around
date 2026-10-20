import { Popup } from "./Popup.js";

export type FormSubmitCallback = (
  inputValues: Record<string, string>,
) => void | Promise<void>;

const DEFAULT_LOADING_TEXT = "Guardando...";

export class PopupWithForm extends Popup {
  private handleFormSubmit: FormSubmitCallback;
  private formElement: HTMLFormElement;
  private inputElements: HTMLInputElement[];
  private submitButton: HTMLButtonElement;
  private defaultButtonText: string;
  private isSubmitting = false;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitCallback) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.inputElements = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    );
    this.submitButton = this.formElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
    this.defaultButtonText = this.submitButton.textContent || "";
  }

  private getInputValues(): Record<string, string> {
    const values: Record<string, string> = {};

    this.inputElements.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  }

  private renderLoading(isLoading: boolean): void {
    this.submitButton.disabled = isLoading;
    this.submitButton.textContent = isLoading
      ? DEFAULT_LOADING_TEXT
      : this.defaultButtonText;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", async (evt: SubmitEvent) => {
      evt.preventDefault();

      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.renderLoading(true);

      try {
        await this.handleFormSubmit(this.getInputValues());
      } finally {
        this.isSubmitting = false;
        this.renderLoading(false);
      }
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}