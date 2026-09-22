export interface IUserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface IUserData {
  name: string;
  job: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor(selectors: IUserInfoSelectors) {
    this.nameElement = document.querySelector(
      selectors.nameSelector,
    ) as HTMLElement;
    this.jobElement = document.querySelector(
      selectors.jobSelector,
    ) as HTMLElement;
  }

  public getUserInfo(): IUserData {
    return {
      name: this.nameElement.textContent || "",
      job: this.jobElement.textContent || "",
    };
  }

  public setUserInfo(data: IUserData): void {
    this.nameElement.textContent = data.name;
    this.jobElement.textContent = data.job;
  }
}
