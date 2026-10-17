import type { CardData } from "../utils/types.js";

export interface ICardHandlers {
  handleCardClick: (data: CardData) => void;
  handleLikeClick: (card: Card) => void;
  handleDeleteClick: (card: Card) => void;
}

const LIKE_ACTIVE_CLASS = "card__like-button_is-active";

export class Card {
  private data: CardData;
  private templateSelector: string;
  private currentUserId: string;
  private handlers: ICardHandlers;
  private element!: HTMLElement;
  private likeButton!: HTMLButtonElement;
  private deleteButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    currentUserId: string,
    handlers: ICardHandlers,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.currentUserId = currentUserId;
    this.handlers = handlers;
  }

  public getId(): string {
    return this.data._id;
  }

  public isOwnedByCurrentUser(): boolean {
    return this.data.owner === this.currentUserId;
  }

  public isLikedByCurrentUser(): boolean {
    return this.data.isLiked;
  }

  public updateLikeStatus(isLiked: boolean): void {
    this.data.isLiked = isLiked;
    this.likeButton.classList.toggle(LIKE_ACTIVE_CLASS, isLiked);
  }

  public removeCard(): void {
    this.element.remove();
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
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    this.likeButton.addEventListener("click", () => {
      this.handlers.handleLikeClick(this);
    });

    this.deleteButton.addEventListener("click", () => {
      this.handlers.handleDeleteClick(this);
    });

    cardImage.addEventListener("click", () => {
      this.handlers.handleCardClick(this.data);
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
    this.likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    this.deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    this.likeButton.classList.toggle(LIKE_ACTIVE_CLASS, this.data.isLiked);

    if (!this.isOwnedByCurrentUser()) {
      this.deleteButton.remove();
    }

    this.setEventListeners();

    return this.element;
  }
}