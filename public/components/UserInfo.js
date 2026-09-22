export class UserInfo {
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.jobElement = document.querySelector(selectors.jobSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            job: this.jobElement.textContent || "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.jobElement.textContent = data.job;
    }
}
