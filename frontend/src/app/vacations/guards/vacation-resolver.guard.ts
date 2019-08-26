import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { VacationsService } from './../vacations.service';
import { User } from 'src/app/shared/model/user';
import { Staff } from 'src/app/shared/model/staff';
import { Employee } from 'src/app/shared/model/employee';
import { Vacation } from './../../shared/model/vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationResolverGuard implements Resolve<Vacation> {
  
  constructor(
    private vacationsService: VacationsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vacation> {
    if (route.params && route.params['id']) {
      const id: number = route.params['id'];
      return this.vacationsService.getById$(id); 
    } 

    const vacation = <Vacation>{};
    vacation.employee = <Employee>{};
    vacation.employee.user = <User>{};
    vacation.employee.staff = <Staff>{};

    return of(vacation);
  }
}
