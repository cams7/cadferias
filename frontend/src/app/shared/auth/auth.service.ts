import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  signin() {

  }

  signout() {  
    this.tokenStorage.removeToken();  
  }
}
