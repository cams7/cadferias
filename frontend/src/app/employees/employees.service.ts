import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { forkJoin, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { StateVO } from './../shared/model/vo/state-vo';
import { CityVO } from '../shared/model/vo/city-vo';
import { UsersService } from './../users/users.service';
import { StaffsService } from './../staffs/staffs.service';
import { BaseService } from '../shared/common/base-service';
import { Employee } from '../shared/model/employee';
import { EmployeeFilterVO } from '../shared/model/vo/filter/employee-filter-vo';

const EMPLOYEES='employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService<Employee, EmployeeFilterVO> {

  constructor(
    protected http: HttpClient,
    private usersService: UsersService,
    private staffsService: StaffsService
  ) { 
    super(http, `${environment.API}${EMPLOYEES}`);
  }

  getById$(id: number) {
    return super.getById$(id).pipe(
      flatMap(employee => {
        const user = employee.user;
        const staff = employee.staff;

        const user$ = this.usersService.getById$(user.id);
        const staff$ = this.staffsService.getById$(staff.id);
        return forkJoin(of(employee), user$, staff$);
      }),
      map(([employee, user, staff])=> {
        employee.user = user;
        employee.staff = staff;
        return employee;
      })
    );
  }

  get allStates$() {
    return this.http.get<StateVO[]>('assets/data/brazilian-states.json');
  }

  get allCities$() {
    return this.http.get<CityVO[]>('assets/data/brazilian-cities.json');  
  }

  totalEmployees$(staffId: number) {
    return this.http.get<Employee[]>(`${environment.API}${EMPLOYEES}`, { params: new HttpParams().append('staff.id', <any>staffId) }).pipe<number>(
      map(employees => (!!employees && employees.length > 0) ? employees.length : 0)
    );
  }

  getByName$(name: string) {
    return this.http.get<Employee[]>(`${environment.API}${EMPLOYEES}`, { 
      params: new HttpParams().append('name_like', name).append('_sort', 'name').append('_order', 'asc').append('_limit', "7") 
    });
  }
}
