import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { UsersService } from './../../users/users.service';
import { User } from './../model/user';
import { Role, RoleName } from '../model/role';

export const TOKEN_PREFIX = 'Bearer ';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedUser$: Observable<User> = EMPTY;

  constructor(
    private tokenStorage: TokenStorageService,
    private usersService: UsersService
  ) { }
  
  loadTokenData() {
    let loggedUser: User;
    if(!!this.tokenStorage.token) 
      loggedUser = this.getLoggedUser(this.tokenStorage.token);
          
    this._loggedUser$ = this.getLoggedUser$(loggedUser);      
  }
  
  signIn$(user: User) {
    this._loggedUser$ = this.usersService.getToken$(user).pipe(
      map(data => {        
        if(!data || !data.token) 
          return undefined;

        if(!data.token.startsWith(TOKEN_PREFIX))
          return undefined;

        const token = data.token.replace(TOKEN_PREFIX, '');

        const loggedUser = this.getLoggedUser(token);
        if(!!loggedUser)
          this.tokenStorage.saveToken(token);  
        
        return loggedUser;
      }),
      switchMap(loggedUser => this.getLoggedUser$(loggedUser)),
      shareReplay()      
    );

    return this.loggedUser$;
  }

  private getLoggedUser(token: string) {
    if(!token || !(new RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/g).test(token)))
      return undefined;

    const tokenSplitted = token.split(/\./g);

    if(tokenSplitted.length != 3)
      return undefined;

    try{
      const decoded = JSON.parse(atob(tokenSplitted[1]));
      const loggedUser = <User>{};
      loggedUser.entityId = Number(decoded['entityId']);
      loggedUser.email = decoded['email'];
      loggedUser.roles = (<string>decoded['roles']).split(/\,/g).map(roleName => {
        const role = <Role>{};
        role.name = RoleName[roleName];
        return role;
      });

      console.log(`sub: ${decoded['sub']}`);
      console.log(`exp: ${decoded['exp']}`);    
      return loggedUser; 
    } catch(_) {}
    return undefined;
  }

  private getLoggedUser$(loggedUser: User) {
    return !!loggedUser ? of(loggedUser): EMPTY;
  }

  signOut() {  
    this._loggedUser$ = EMPTY;
    this.tokenStorage.removeToken();  
  }

  get loggedUser$() {
    return this._loggedUser$.pipe(  
      filter(user => this.tokenStorage.token && !!user && !!user.entityId)
    );
  }

  get loggedIn$() {
    return this._loggedUser$.pipe(
      map(user => this.tokenStorage.token && !!user && !!user.entityId)
    );  
  }
  
}
