import { Popup } from "./Popup.js";

export type ConfirmHandler = () => void | Promise<void>;

const DEFAULT_LOADING_TEXT = "Eliminando...";

export class PopupWithConfirmation extends Popup {
  private confirmButton: HTMLButtonElement;
  private defaultButtonText: string;
  private isSubmitting = false;
  private handleConfirm: ConfirmHandler = () => {};

  constructor(popupSelector: string) {
    super(popupSelector);
    this.confirmButton = this.popupElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
    this.defaultButtonText = this.confirmButton.textContent || "";
  }

  public setSubmitHandler(handler: ConfirmHandler): void {
    this.handleConfirm = handler;
  }

  private renderLoading(isLoading: boolean): void {
    this.confirmButton.disabled = isLoading;
    this.confirmButton.textContent = isLoading
      ? DEFAULT_LOADING_TEXT
      : this.defaultButtonText;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.confirmButton.addEventListener("click", async () => {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.renderLoading(true);

      try {
        await this.handleConfirm();
      } finally {
        this.isSubmitting = false;
        this.renderLoading(false);
      }
    });
  }
}