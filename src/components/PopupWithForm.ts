import { Popup } from "./Popup.js";

export type FormSubmitCallback = (
  inputValues: Record<string, string>,
) => void;

export class PopupWithForm extends Popup {
  private handleFormSubmit: FormSubmitCallback;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];

  constructor(popupSelector: string, handleFormSubmit: FormSubmitCallback) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    );
  }

  private getInputValues(): Record<string, string> {
    const values: Record<string, string> = {};

    this.inputList.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}
