import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import { defaultFormConfig } from "./utils/constants.js";
import { setButtonText } from "./utils/helpers.js";
import { AUTH_TOKEN } from "./utils/token.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: AUTH_TOKEN,
        "Content-Type": "application/json",
    },
});
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const nameInput = document.querySelector("#name-input");
const descriptionInput = document.querySelector("#description-input");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: "#profile-avatar",
});
let currentUserId = "";
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function handleCardClick(data) {
    imagePopup.open(data);
}
function handleLikeClick(card) {
    const isLiked = card.isLikedByCurrentUser();
    const request = isLiked
        ? api.unlikeCard(card.getId())
        : api.likeCard(card.getId());
    request
        .then((updatedCard) => card.updateLikeStatus(updatedCard.isLiked))
        .catch((err) => console.error(err));
}
function handleDeleteClick(card) {
    deleteConfirmationPopup.open(card);
}
function renderCard(data) {
    return new Card(data, "#card-template", currentUserId, {
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
    });
}
const cardSection = new Section({
    items: [],
    renderer: (data) => {
        cardSection.addItem(renderCard(data).generateCard());
    },
}, ".cards__list");
const deleteConfirmationPopup = new PopupWithConfirmation("#delete-popup", (card, confirmButton) => {
    setButtonText(confirmButton, true, "Eliminando...");
    api
        .deleteCard(card.getId())
        .then(() => {
        card.removeCard();
        deleteConfirmationPopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => setButtonText(confirmButton, false));
});
deleteConfirmationPopup.setEventListeners();
const editProfilePopup = new PopupWithForm("#edit-popup", (values, submitButton) => {
    setButtonText(submitButton, true);
    const data = {
        name: values.name,
        about: values.description,
    };
    api
        .editUserInfo(data)
        .then((updatedUser) => {
        userInfo.setUserInfo({
            name: updatedUser.name,
            about: updatedUser.about,
        });
        editProfilePopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => setButtonText(submitButton, false));
});
editProfilePopup.setEventListeners();
const editFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#edit-profile-form"));
editFormValidator.enableValidation();
editProfileButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.about;
    editFormValidator.resetValidation();
    editProfilePopup.open();
});
const addCardPopup = new PopupWithForm("#new-card-popup", (values, submitButton) => {
    setButtonText(submitButton, true);
    const cardData = {
        name: values["place-name"],
        link: values.link,
    };
    api
        .addCard(cardData)
        .then((newCard) => {
        cardSection.addItem(renderCard(newCard).generateCard());
        addCardPopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => setButtonText(submitButton, false));
});
addCardPopup.setEventListeners();
const addCardFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#new-card-form"));
addCardFormValidator.enableValidation();
addCardButton.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
});
const avatarPopup = new PopupWithForm("#avatar-popup", (values, submitButton) => {
    setButtonText(submitButton, true);
    const avatarData = { avatar: values.avatar };
    api
        .updateAvatar(avatarData)
        .then((updatedUser) => {
        userInfo.setAvatar(updatedUser.avatar);
        avatarPopup.close();
    })
        .catch((err) => console.error(err))
        .finally(() => setButtonText(submitButton, false));
});
avatarPopup.setEventListeners();
const avatarFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#avatar-form"));
avatarFormValidator.enableValidation();
avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setAvatar(userData.avatar);
    initialCards.forEach((cardData) => {
        cardSection.addItem(renderCard(cardData).generateCard());
    });
})
    .catch((err) => {
    console.error("Fallo al cargar datos iniciales:", err);
});
