import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import { AppEventsService, AlertMessage } from './shared/events.service';
import { AuthService } from './shared/auth/auth.service';
import { HttpIndicatorService } from './shared/http-indicator.service';
import { SigninService } from './signin/signin.service';
import { PageAndSort } from './shared/common/base-service';
import { Direction } from './shared/model/vo/pagination/sort-vo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {  

  readonly queryParams = <PageAndSort>{
    page: 1, 
    itemsPerPage: 10,
    sort: 'id',
    order: Direction.DESC
  };

  private _alerts: AlertMessage[] = [];
  private subscriptions: Subscription[] = [];

  private _loading: ElementRef;
  @ViewChild('divLoading', { read: ElementRef, static:true }) set loading (loading: ElementRef) {
    this._loading = loading;
  };

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private eventsService: AppEventsService,
    private authService: AuthService,
    private httpIndicatorService: HttpIndicatorService,
    private signinService: SigninService
  ) { }

  ngOnInit() {
    this.authService.loadTokenData();
    //FIXME Remove the line below when the app development phase is over
    this.eventsService.resetAllSearchs();

    this.subscriptions.push(
      this.eventsService.alert$.subscribe(alert => {
        this._alerts.push(alert);
        this.scrollToTop();
      })
    );
  }

  ngAfterViewInit() {
    this.renderer.addClass(this._loading.nativeElement, 'hide-loading');
    this.subscriptions.push(
      this.httpIndicatorService.onLoadingChanged.subscribe(loading => {  
        if(loading) {
          this.renderer.removeClass(this._loading.nativeElement, 'hide-loading');
        } else {
          this.renderer.addClass(this._loading.nativeElement, 'hide-loading');
        }
      })
    ); 
  }

  ngOnDestroy() {
    this.authService.signOut();
    this.eventsService.endAllEvents();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  login() {
    this.signinService.showSignin$().subscribe();
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

  scrollToTop() {
    $('html,body').animate({
      scrollTop: $('.container').offset().top
    },'1000');
  }

  get isLoggedIn$() {
    return this.authService.loggedIn$;
  }

  get alerts() {
    return this._alerts;
  } 
}
