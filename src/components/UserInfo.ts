import type { UserFormData } from "../utils/types.js";

export interface IUserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;
  private avatarElement: HTMLImageElement;

  constructor(selectors: IUserInfoSelectors) {
    this.nameElement = document.querySelector(
      selectors.nameSelector,
    ) as HTMLElement;
    this.jobElement = document.querySelector(
      selectors.jobSelector,
    ) as HTMLElement;
    this.avatarElement = document.querySelector(
      selectors.avatarSelector,
    ) as HTMLImageElement;
  }

  public getUserInfo(): UserFormData {
    return {
      name: this.nameElement.textContent || "",
      about: this.jobElement.textContent || "",
    };
  }

  public setUserInfo(data: UserFormData): void {
    this.nameElement.textContent = data.name;
    this.jobElement.textContent = data.about;
  }

  public setAvatar(avatarUrl: string): void {
    this.avatarElement.src = avatarUrl;
  }
}