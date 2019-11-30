import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';

import { BaseForm } from '../common/base-form';
import { HistoryService } from '../history.service';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<BaseForm<any>> {
  constructor(
    private historyService: HistoryService
  ) { }

  canDeactivate(component: BaseForm<any>, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {
    const unchangedData$ = component.unchangedData$();
    if(!!unchangedData$)
      return unchangedData$.pipe(tap(isChangedPage => this.historyService.isUnchangedPage = !isChangedPage));

    return of(true).pipe(tap(isChangedPage => this.historyService.isUnchangedPage = !isChangedPage));
  }
}
