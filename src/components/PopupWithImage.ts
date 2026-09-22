import { Popup } from "./Popup.js";
import { ICardData } from "./Card.js";

export class PopupWithImage extends Popup<ICardData> {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.imageElement = this.popupElement.querySelector(
      ".popup__image",
    ) as HTMLImageElement;
    this.captionElement = this.popupElement.querySelector(
      ".popup__caption",
    ) as HTMLElement;
  }

  public open(data: ICardData): void {
    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.captionElement.textContent = data.name;
    super.open();
  }
}
