import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppEventsService, AlertMessage } from './shared/events.service';
import { AuthService } from './shared/auth/auth.service';
import { PageAndSort } from './shared/common/base-service';
import { SortOrder } from './shared/common/sort-field.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly queryParams = <PageAndSort>{
    page: 1, 
    itemsPerPage: 10,
    sort: 'id',
    order: SortOrder.DESC
  };

  private _alerts: AlertMessage[] = [];
  private alertSubscription: Subscription;

  constructor(
    private router: Router,
    private eventsService: AppEventsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loadTokenData();
    //FIXME Remove the line below when the app development phase is over
    this.eventsService.resetAllSearchs();

    this.alertSubscription = this.eventsService.alert$.subscribe(alert => {
      this._alerts.push(alert);
    });
  }

  ngOnDestroy() {
    this.authService.signOut();
    this.eventsService.endAllEvents();
    this.alertSubscription.unsubscribe();
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  get isLoggedIn$() {
    return this.authService.loggedIn$;
  }

  isLinkActive(url: string) {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);

    if(url.length > 1){ // if url != '/'
      return baseUrl.startsWith(url);
    }

    return baseUrl === url;
  }

  onClosed(dismissedAlert: AlertMessage) {
    this._alerts = this._alerts.filter(alert => alert !== dismissedAlert);
  }

  get alerts() {
    return this._alerts;
  }

}
