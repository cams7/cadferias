import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { EmployeesService } from '../employees.service';
import { User } from './../../shared/model/user';
import { Staff } from './../../shared/model/staff';
import { Employee, Address } from './../../shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverGuard implements Resolve<Employee> {
  
  constructor(
    private employeesService: EmployeesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    if (route.params && route.params['id']) {
      const id: number = route.params['id'];
      return this.employeesService.getById$(id); 
    }

    const employee = <Employee>{};
    employee.address = <Address>{};
    employee.user = <User>{};
    employee.staff = <Staff>{};

    return of(employee);
  }
}
