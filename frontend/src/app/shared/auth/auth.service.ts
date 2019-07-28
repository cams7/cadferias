import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { TokenStorageService } from './token-storage.service';
import { User } from './../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedUser$: Observable<User> = of(undefined);

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  signIn$(user: User) {
    let params = new HttpParams();
    params = params.append('email', user.email);
    params = params.append('password', user.password);
    
    this._loggedUser$ = this.http.get(`${environment.API}users`, { params: params }).pipe(
      map((data: any) => data.length == 1 ? data[0].token : undefined),
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
