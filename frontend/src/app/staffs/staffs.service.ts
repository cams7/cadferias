import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { Staff } from './../shared/model/staff';
import { StaffFilterVO } from '../shared/model/vo/filter/staff-filter-vo';
import { SearchBySelectVO } from '../shared/model/vo/search-by-select-vo';
import { SortVO, Direction } from './../shared/model/vo/pagination/sort-vo';

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

  getOnlyStaffById$(id: number) {
    return this.http.get<Staff>(`${this.API_URL}/only/${id}`);
  }

  getByName$(name: string) {
    const search = <SearchBySelectVO>{};
    search.searchValue = name;
    search.sort = <SortVO>{property: 'name', direction: Direction.ASC};
    search.size = this.searchSize;
    return this.http.post<Staff[]>(`${this.API_URL}/searchByName`, search);
  }
}
