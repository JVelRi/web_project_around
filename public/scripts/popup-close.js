// cierra popups con clic afuera o con Esc

function createEscCloseHandler(closeModal) {
  return function handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  };
}

function handleOverlayClick(evt, closeModal) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function setOverlayCloseListeners(popupList, closeModal) {
  popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) =>
      handleOverlayClick(evt, closeModal),
    );
  });
}

export { createEscCloseHandler, setOverlayCloseListeners };
