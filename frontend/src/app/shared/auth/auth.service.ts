import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { User } from './../model/user';
import { UsersService } from 'src/app/users/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedUser$: Observable<User> = of(undefined);

  constructor(
    private tokenStorage: TokenStorageService,
    private usersService: UsersService
  ) { }
  
  loadTokenData() {
    if(this.tokenStorage.token) {
      const loggedUser = <User>JSON.parse(this.tokenStorage.token);
      this._loggedUser$ = of(loggedUser); 
    } 
  }

  signIn$(user: User) {
    this._loggedUser$ = this.usersService.getToken$(user).pipe(
      map(token => {
        if(!token) 
          return undefined;

        this.tokenStorage.saveToken(token);
        const loggedUser = <User>JSON.parse(token);
        return loggedUser; 
      }),
      shareReplay()      
    );

    return this.loggedUser$;
  }

  signOut() {  
    this._loggedUser$ = of(undefined);
    this.tokenStorage.removeToken();  
  }

  get loggedUser$() {
    return this._loggedUser$.pipe(  
      filter(user => this.tokenStorage.token && !!user && !!user.id)    
    );
  }

  get loggedIn$() {
    return this._loggedUser$.pipe(
      map(user => this.tokenStorage.token && !!user && !!user.id)
    );  
  }
  
}
