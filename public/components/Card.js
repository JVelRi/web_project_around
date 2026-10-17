const LIKE_ACTIVE_CLASS = "card__like-button_is-active";
export class Card {
    constructor(data, templateSelector, currentUserId, handlers) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.currentUserId = currentUserId;
        this.handlers = handlers;
    }
    getId() {
        return this.data._id;
    }
    isOwnedByCurrentUser() {
        return this.data.owner === this.currentUserId;
    }
    isLikedByCurrentUser() {
        return this.data.isLiked;
    }
    updateLikeStatus(isLiked) {
        this.data.isLiked = isLiked;
        this.likeButton.classList.toggle(LIKE_ACTIVE_CLASS, isLiked);
    }
    removeCard() {
        this.element.remove();
    }
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        return template.content
            .querySelector(".card")
            .cloneNode(true);
    }
    setEventListeners() {
        const cardImage = this.element.querySelector(".card__image");
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
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        this.likeButton = this.element.querySelector(".card__like-button");
        this.deleteButton = this.element.querySelector(".card__delete-button");
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
