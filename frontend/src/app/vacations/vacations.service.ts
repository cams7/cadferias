import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { forkJoin, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { EmployeesService } from '../employees/employees.service';
import { Vacation } from './../shared/model/vacation';

const VACATIONS = 'vacations';
@Injectable({
  providedIn: 'root'
})
export class VacationsService extends BaseService<Vacation> {

  constructor(
    protected http: HttpClient,
    private employeesService: EmployeesService
  ) { 
    super(http, `${environment.API}${VACATIONS}`);
  }

  getById$(id: number) {
    return super.getById$(id).pipe(
      flatMap(vacation => {
        const employee = vacation.employee;
        const employee$ = this.employeesService.getById$(employee.id);
        return forkJoin(of(vacation), employee$);
      }),
      map(([vacation, employee])=> {
        vacation.employee = employee;
        return vacation;
      })
    );
  }

  totalVacations$(employeeId: number) {
    return this.http.get<Vacation[]>(`${environment.API}${VACATIONS}`, { params: new HttpParams().append('employee.id', <any>employeeId) }).pipe<number>(
      map(employees => (!!employees && employees.length > 0) ? employees.length : 0)
    );
  }
}
