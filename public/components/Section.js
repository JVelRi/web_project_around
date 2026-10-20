export class Section {
    constructor(config, containerSelector) {
        this.items = config.items;
        this.renderer = config.renderer;
        this.containerElement = document.querySelector(containerSelector);
    }
    renderItems(items = this.items) {
        items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.containerElement.prepend(element);
    }
}
