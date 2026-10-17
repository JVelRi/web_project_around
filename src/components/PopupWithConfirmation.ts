import { Popup } from "./Popup.js";

export type ConfirmationCallback<T> = (
  item: T,
  confirmButton: HTMLButtonElement,
) => void;

export class PopupWithConfirmation<T> extends Popup<T> {
  private confirmButton: HTMLButtonElement;
  private handleConfirm: ConfirmationCallback<T>;
  private currentItem: T | null = null;

  constructor(popupSelector: string, handleConfirm: ConfirmationCallback<T>) {
    super(popupSelector);
    this.handleConfirm = handleConfirm;
    this.confirmButton = this.popupElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
  }

  public open(item: T): void {
    this.currentItem = item;
    super.open(item);
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.confirmButton.addEventListener("click", () => {
      if (this.currentItem !== null) {
        this.handleConfirm(this.currentItem, this.confirmButton);
      }
    });
  }
}
