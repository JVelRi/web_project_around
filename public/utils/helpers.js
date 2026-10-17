export function setButtonText(button, isLoading, loadingText = "Guardando...") {
    var _a, _b, _c, _d;
    if (isLoading) {
        button.dataset.originalText = (_b = (_a = button.dataset.originalText) !== null && _a !== void 0 ? _a : button.textContent) !== null && _b !== void 0 ? _b : "";
        button.textContent = loadingText;
    }
    else {
        button.textContent = (_d = (_c = button.dataset.originalText) !== null && _c !== void 0 ? _c : button.textContent) !== null && _d !== void 0 ? _d : "";
    }
}
