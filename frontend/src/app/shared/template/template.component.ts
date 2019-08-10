import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, shareReplay, tap, filter } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Page } from '../common/base-service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {

  readonly queryParams = <Page>{page: 20, itemsPerPage: 20};

  private _url$: Observable<string>;

  test$ = of('/employees');
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this._url$ = this.router.events.pipe(
      take(1),
      map(events => (<NavigationStart>events).url),
      filter(url => !!url),
      map(url => url.trim().replace(/\?[\w\=\&]+/,'')),      
      tap(url => console.log('url: ', url)),
      shareReplay()
    )
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }
  
  get isLoggedIn$() {
    return this.authService.loggedIn$;
  }

  get url$() {
    return this._url$;
  }

}
