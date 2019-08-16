import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, of } from 'rxjs';
import { flatMap, map, filter, share, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { UsersService } from 'src/app/users/users.service';
import { StaffsService } from './../staffs/staffs.service';
import { BaseService } from '../shared/common/base-service';
import { Employee } from '../shared/model/employee';
import { StateVO } from './../shared/model/vo/state-vo';
import { CityVO } from '../shared/model/vo/city-vo';

const EMPLOYEES='employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService<Employee> {

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
}
