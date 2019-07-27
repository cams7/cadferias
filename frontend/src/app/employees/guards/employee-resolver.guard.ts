import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { EmployeesService } from '../employees.service';
import { Employee } from 'src/app/shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverGuard implements Resolve<Employee> {
  
  constructor(
    private employeesService: EmployeesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    if (route.params && route.params['id']) 
      return of(<Employee>{}); 

    return of(<Employee>{});
  }
}
