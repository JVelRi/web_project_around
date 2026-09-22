export interface ISectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private items: T[];
  private renderer: (item: T) => void;
  private containerElement: HTMLElement;

  constructor(config: ISectionConfig<T>, containerSelector: string) {
    this.items = config.items;
    this.renderer = config.renderer;
    this.containerElement = document.querySelector(
      containerSelector,
    ) as HTMLElement;
  }

  public renderItems(): void {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this.containerElement.prepend(element);
  }
}
