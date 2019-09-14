import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { Staff } from './../shared/model/staff';
import { StaffFilterVO } from '../shared/model/vo/filter/staff-filter-vo';

const STAFFS = 'staffs';
@Injectable({
  providedIn: 'root'
})
export class StaffsService extends BaseService<Staff, StaffFilterVO> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}${STAFFS}`);
  }

  getByName$(name: string) {
    return this.http.get<Staff[]>(`${environment.API}${STAFFS}`, { 
      params: new HttpParams().append('name_like', name).append('_sort', 'name').append('_order', 'asc').append('_limit', "7") 
    });
  }
}
