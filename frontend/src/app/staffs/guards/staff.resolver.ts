import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { StaffsService } from '../staffs.service';
import { Staff } from '../../shared/model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffResolver implements Resolve<Staff> {
  
  constructor(
    private staffsService: StaffsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Staff> {
    if (route.params && route.params['id']) {
      const entityId: number = route.params['id'];
      const path = route.routeConfig.path;
      
      if(path.endsWith('/details'))
        return this.staffsService.getWithAuditById$(entityId); 

      return this.staffsService.getById$(entityId); 
    }

    return of(<Staff>{});
  }
}
