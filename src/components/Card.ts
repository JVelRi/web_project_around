export interface ICardData {
  name: string;
  link: string;
}

export class Card {
  private data: ICardData;
  private templateSelector: string;
  private handleCardClick: (data: ICardData) => void;
  private element!: HTMLElement;

  constructor(
    data: ICardData,
    templateSelector: string,
    handleCardClick: (data: ICardData) => void,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector(
      this.templateSelector,
    ) as HTMLTemplateElement;

    return template.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private setEventListeners(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton.addEventListener("click", () => {
      this.element.remove();
    });

    cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data);
    });
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    const cardTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    this.setEventListeners();

    return this.element;
  }
}
