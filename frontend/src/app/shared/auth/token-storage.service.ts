import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveToken(token: string) {
    this.removeToken();
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  get token() {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
