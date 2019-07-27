import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationResolverGuard implements Resolve<Vacation> {
  
  constructor(
    private vacationsService: VacationsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vacation> {
    if (route.params && route.params['id']) 
      return of(<Vacation>{}); 

    return of(<Vacation>{});
  }
}
