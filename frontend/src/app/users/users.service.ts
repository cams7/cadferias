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
    return this.http.post<{token: string}>(`${environment.API}api/auth/signin`, user);
  }
}
