import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { Employee } from '../shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService<Employee> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}employees`);
  }
}
