import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
    order: SortOrder.DESC
  };
 
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
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

  isLinkActive(url: string) {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);

    if(url.length > 1){ // if url != '/'
      return baseUrl.startsWith(url);
    }

    return baseUrl === url;
  }
}
