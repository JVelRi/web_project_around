export function setButtonText(
  button: HTMLButtonElement,
  isLoading: boolean,
  loadingText: string = "Guardando...",
): void {
  if (isLoading) {
    button.dataset.originalText = button.dataset.originalText ?? button.textContent ?? "";
    button.textContent = loadingText;
  } else {
    button.textContent = button.dataset.originalText ?? button.textContent ?? "";
  }
}
