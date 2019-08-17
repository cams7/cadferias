import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, of } from "rxjs";

import { BaseForm } from '../common/base-form';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<BaseForm> {
  constructor() { }

  canDeactivate(component: BaseForm, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {
    const unchangedData$ = component.unchangedData$();
    if(!!unchangedData$)
      return unchangedData$;

    return of(true);
  }
}
