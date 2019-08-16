import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { User } from './../shared/model/user';

const USERS = 'users';
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}${USERS}`);
  }

  getToken$(user: User) {
    const params = Object.keys(user).reduce((params, fieldName) => {
      return params.append(fieldName, user[fieldName]);
    }, new HttpParams());
    
    return this.http.get(`${environment.API}${USERS}`, { params: params }).pipe(
      map((data: any) => data.length == 1 ? data[0].token : undefined)   
    );
  }
}
