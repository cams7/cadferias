import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { User } from './../shared/model/user';
import { UserFilterVO } from '../shared/model/vo/filter/user-filter-vo';

const USERS = 'users';
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User, UserFilterVO> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}${USERS}`);
  }

  getToken$(user: User) {
    /*const params = Object.keys(user).reduce((params, fieldName) => {
      return params.append(fieldName, user[fieldName]);
    }, new HttpParams());
    
    return this.http.get(`${environment.API}${USERS}`, { params: params }).pipe(
      map((data: any) => data.length == 1 ? data[0].token : undefined)   
    );*/
    return of("{\"id\": 1,\"email\": \"jorge78@teste.com\"}");
  }

  isRegisteredEmail$(email: string) {
    /*return this.http.get<User[]>(`${environment.API}${USERS}`, { params: new HttpParams().append('email', email) }).pipe<boolean>(
      map(users => !!users && users.length > 0)
    );*/
    return of(true);
  }
}
