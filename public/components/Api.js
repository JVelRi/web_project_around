var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    request(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
            const res = yield fetch(`${this.baseUrl}${endpoint}`, Object.assign(Object.assign({}, options), { headers: this.headers }));
            if (res.ok) {
                return res;
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request("/users/me");
            return yield res.json();
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request("/cards/");
            return yield res.json();
        });
    }
    editUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request("/users/me", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            return yield res.json();
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request("/cards/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            return yield res.json();
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`/cards/${cardId}`, { method: "DELETE" });
        });
    }
    likeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(`/cards/${cardId}/likes`, {
                method: "PUT",
            });
            return yield res.json();
        });
    }
    unlikeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(`/cards/${cardId}/likes`, {
                method: "DELETE",
            });
            return yield res.json();
        });
    }
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request("/users/me/avatar", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            return yield res.json();
        });
    }
}
