import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { forkJoin, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { EmployeesService } from '../employees/employees.service';
import { Vacation } from './../shared/model/vacation';
import { VacationFilterVO } from '../shared/model/vo/filter/vacation-filter-vo';

const VACATIONS = 'vacations';
@Injectable({
  providedIn: 'root'
})
export class VacationsService extends BaseService<Vacation, VacationFilterVO> {

  constructor(
    protected http: HttpClient,
    private employeesService: EmployeesService
  ) { 
    super(http, `${environment.API}${VACATIONS}`);
  }  
}
