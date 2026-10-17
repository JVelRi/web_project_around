export class UserInfo {
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.jobElement = document.querySelector(selectors.jobSelector);
        this.avatarElement = document.querySelector(selectors.avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            about: this.jobElement.textContent || "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.jobElement.textContent = data.about;
    }
    setAvatar(avatarUrl) {
        this.avatarElement.src = avatarUrl;
    }
}
