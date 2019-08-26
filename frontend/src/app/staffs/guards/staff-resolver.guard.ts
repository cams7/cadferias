import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { StaffsService } from './../staffs.service';
import { Staff } from './../../shared/model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffResolverGuard implements Resolve<Staff> {
  
  constructor(
    private staffsService: StaffsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Staff> {
    if (route.params && route.params['id']) {
      const id: number = route.params['id'];
      return this.staffsService.getById$(id); 
    }

    return of(<Staff>{});
  }
}
