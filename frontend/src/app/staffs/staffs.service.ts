import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { Staff } from './../shared/model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffsService extends BaseService<Staff> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}staffs`);
  }
}
