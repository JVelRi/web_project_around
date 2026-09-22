import { FormValidator } from "./components/FormValidator.js";
import { Card, ICardData } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";

const editProfileButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const addCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;

const nameInput = document.querySelector("#name-input") as HTMLInputElement;
const descriptionInput = document.querySelector(
  "#description-input",
) as HTMLInputElement;

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(data: ICardData): void {
  imagePopup.open(data);
}

const cardSection = new Section<ICardData>(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", handleCardClick);
      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list",
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo({ name: values.name, job: values.description });
  editProfilePopup.close();
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
  descriptionInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm("#new-card-popup", (values) => {
  const cardData: ICardData = { name: values["place-name"], link: values.link };
  const card = new Card(cardData, "#card-template", handleCardClick);
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
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
