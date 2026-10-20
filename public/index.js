var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { API_TOKEN } from "./utils/token.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: API_TOKEN,
        "Content-Type": "application/json",
    },
});
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector("#avatar-edit-button");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#description-input");
let currentUserId = "";
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
// Ventanas emergentes
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const confirmPopup = new PopupWithConfirmation("#delete-popup");
confirmPopup.setEventListeners();
// Tarjetas
function handleCardClick(data) {
    imagePopup.open(data);
}
function handleLikeClick(card) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCard = card.isLikedByCurrentUser()
                ? yield api.unlikeCard(card.getId())
                : yield api.likeCard(card.getId());
            card.updateLikeStatus(updatedCard.isLiked);
        }
        catch (err) {
            console.error(err);
        }
    });
}
function handleDeleteClick(card) {
    confirmPopup.setSubmitHandler(() => __awaiter(this, void 0, void 0, function* () {
        try {
            yield api.deleteCard(card.getId());
            card.removeCard();
            confirmPopup.close();
        }
        catch (err) {
            console.error(err);
        }
    }));
    confirmPopup.open();
}
function createCard(data) {
    const card = new Card(data, "#card-template", currentUserId, {
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
    });
    return card.generateCard();
}
const cardSection = new Section({
    items: [],
    renderer: (data) => {
        cardSection.addItem(createCard(data));
    },
}, ".cards__list");
// Editar perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            name: values.name,
            about: values.description,
        };
        const updatedUser = yield api.editUserInfo(userData);
        userInfo.setUserInfo(updatedUser);
        editProfilePopup.close();
    }
    catch (err) {
        console.error(err);
    }
}));
editProfilePopup.setEventListeners();
const editFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#edit-profile-form"));
editFormValidator.enableValidation();
editProfileButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    aboutInput.value = currentUserInfo.about;
    editFormValidator.resetValidation();
    editProfilePopup.open();
});
// Agregar tarjeta
const addCardPopup = new PopupWithForm("#new-card-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardData = {
            name: values["place-name"],
            link: values.link,
        };
        const newCard = yield api.addCard(cardData);
        cardSection.addItem(createCard(newCard));
        addCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}));
addCardPopup.setEventListeners();
const addCardFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#new-card-form"));
addCardFormValidator.enableValidation();
addCardButton.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
});
// Actualizar foto de perfil
const avatarPopup = new PopupWithForm("#avatar-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avatarData = { avatar: values.avatar };
        const updatedUser = yield api.updateAvatar(avatarData);
        userInfo.setAvatar(updatedUser.avatar);
        avatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}));
avatarPopup.setEventListeners();
const avatarFormValidator = new FormValidator(defaultFormConfig, document.querySelector("#avatar-form"));
avatarFormValidator.enableValidation();
editAvatarButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
// Carga inicial: las tarjetas se muestran solo cuando ya se conoce el _id del usuario
function loadInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            currentUserId = userData._id;
            userInfo.setUserInfo(userData);
            userInfo.setAvatar(userData.avatar);
            cardSection.renderItems(initialCards);
        }
        catch (err) {
            console.error("Fallo al cargar datos iniciales:", err);
        }
    });
}
loadInitialData();
