import type {
  AvatarFormData,
  CardData,
  CardFormData,
  UserData,
  UserFormData,
} from "../utils/types.js";

export interface IApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(options: IApiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  private async request(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: this.headers,
    });

    if (res.ok) {
      return res;
    }

    throw new Error(`Error: ${res.status}`);
  }

  public async getUserInfo(): Promise<UserData> {
    const res = await this.request("/users/me");
    return await res.json();
  }

  public async getInitialCards(): Promise<CardData[]> {
    const res = await this.request("/cards/");
    return await res.json();
  }

  public async editUserInfo(data: UserFormData): Promise<UserData> {
    const res = await this.request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  public async addCard(data: CardFormData): Promise<CardData> {
    const res = await this.request("/cards/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  public async deleteCard(cardId: string): Promise<void> {
    await this.request(`/cards/${cardId}`, { method: "DELETE" });
  }

  public async likeCard(cardId: string): Promise<CardData> {
    const res = await this.request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
    return await res.json();
  }

  public async unlikeCard(cardId: string): Promise<CardData> {
    const res = await this.request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
    return await res.json();
  }

  public async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res = await this.request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return await res.json();
  }
}