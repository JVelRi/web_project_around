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
import type {
  AvatarFormData,
  CardData,
  CardFormData,
  UserFormData,
} from "./utils/types.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
});

const editProfileButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const addCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;
const editAvatarButton = document.querySelector(
  "#avatar-edit-button",
) as HTMLButtonElement;

const nameInput = document.querySelector("#name-input") as HTMLInputElement;
const aboutInput = document.querySelector(
  "#description-input",
) as HTMLInputElement;

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
function handleCardClick(data: CardData): void {
  imagePopup.open(data);
}

async function handleLikeClick(card: Card): Promise<void> {
  try {
    const updatedCard = card.isLikedByCurrentUser()
      ? await api.unlikeCard(card.getId())
      : await api.likeCard(card.getId());
    card.updateLikeStatus(updatedCard.isLiked);
  } catch (err) {
    console.error(err);
  }
}

function handleDeleteClick(card: Card): void {
  confirmPopup.setSubmitHandler(async () => {
    try {
      await api.deleteCard(card.getId());
      card.removeCard();
      confirmPopup.close();
    } catch (err) {
      console.error(err);
    }
  });
  confirmPopup.open();
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(data, "#card-template", currentUserId, {
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  });
  return card.generateCard();
}

const cardSection = new Section<CardData>(
  {
    items: [],
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    },
  },
  ".cards__list",
);

// Editar perfil
const editProfilePopup = new PopupWithForm("#edit-popup", async (values) => {
  try {
    const userData: UserFormData = {
      name: values.name,
      about: values.description,
    };
    const updatedUser = await api.editUserInfo(userData);
    userInfo.setUserInfo(updatedUser);
    editProfilePopup.close();
  } catch (err) {
    console.error(err);
  }
});
editProfilePopup.setEventListeners();

const editFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector("#edit-profile-form") as HTMLFormElement,
);
editFormValidator.enableValidation();

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

// Agregar tarjeta
const addCardPopup = new PopupWithForm("#new-card-popup", async (values) => {
  try {
    const cardData: CardFormData = {
      name: values["place-name"],
      link: values.link,
    };
    const newCard = await api.addCard(cardData);
    cardSection.addItem(createCard(newCard));
    addCardPopup.close();
  } catch (err) {
    console.error(err);
  }
});
addCardPopup.setEventListeners();

const addCardFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector("#new-card-form") as HTMLFormElement,
);
addCardFormValidator.enableValidation();

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Actualizar foto de perfil
const avatarPopup = new PopupWithForm("#avatar-popup", async (values) => {
  try {
    const avatarData: AvatarFormData = { avatar: values.avatar };
    const updatedUser = await api.updateAvatar(avatarData);
    userInfo.setAvatar(updatedUser.avatar);
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  }
});
avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector("#avatar-form") as HTMLFormElement,
);
avatarFormValidator.enableValidation();

editAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

// Carga inicial: las tarjetas se muestran solo cuando ya se conoce el _id del usuario
async function loadInitialData(): Promise<void> {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    cardSection.renderItems(initialCards);
  } catch (err) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}

loadInitialData();