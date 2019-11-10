import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import { EventsService } from './shared/events.service';
import { AlertMessageVO } from './shared/model/vo/message/alert-message-vo';
import { ErrorsService } from './shared/errors.service';
import { AuthService } from './shared/auth/auth.service';
import { HttpIndicatorService } from './shared/http-indicator.service';
import { SigninService } from './signin/signin.service';
import { MessageType } from './shared/model/vo/message/message-vo';
import { ErrorException } from './shared/model/vo/error/error-vo';
import { QUERY_PARAMS } from './shared/common/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {  

  readonly queryParams = QUERY_PARAMS;

  private _alerts: AlertMessageVO[] = [];
  private subscriptions: Subscription[] = [];

  private _loading: ElementRef;
  @ViewChild('divLoading', { read: ElementRef, static:true }) set loading (loading: ElementRef) {
    this._loading = loading;
  };

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private eventsService: EventsService,
    private errorsService: ErrorsService,
    private authService: AuthService,
    private httpIndicatorService: HttpIndicatorService,
    private signinService: SigninService
  ) { }

  ngOnInit() {
    this.authService.loadTokenData();
    //FIXME Remove the line below when the app development phase is over
    this.eventsService.resetAllSearchs();

    this.subscriptions.push(
      this.errorsService.erros$.subscribe(error => {
        switch (error.type) {
          case MessageType.DANGER:
            this.eventsService.addDangerAlert(error.title, error.message);
            break;
          case MessageType.WARNING: {
            this.eventsService.addWarningAlert(error.title, error.message);
            if(ErrorException.EXPIRED_JWT == error.exception)
              this.login();            
            break;
          }
          case MessageType.SUCCESS:
            this.eventsService.addSuccessAlert(error.title, error.message);
            break;
          case MessageType.INFO:
            this.eventsService.addInfoAlert(error.title, error.message);
            break;
          default:
            break;
        }
      }),
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
    this.errorsService.end();
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

  onClosed(dismissedAlert: AlertMessageVO) {
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
