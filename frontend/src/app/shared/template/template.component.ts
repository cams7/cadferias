import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { take, map, shareReplay, tap, filter } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { PageAndSort } from './../common/base-service';
import { SortOrder } from '../common/sort-field.directive';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {

  readonly queryParams = <PageAndSort>{
    page: 1, 
    itemsPerPage: 10,
    sort: 'id',
    order: SortOrder.ASC
  };

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
      tap(url => console.log(`URL: ${url}`)),
      shareReplay()
    )
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  isLinkActive$(routeLink: string) {
    return forkJoin(
      of(routeLink),
      this.url$
    ).pipe(
      map(([routeLink, url]) => routeLink == url)
    );
  }
  
  get isLoggedIn$() {
    return this.authService.loggedIn$;
  }

  get url$() {
    return this._url$;
  }

}
