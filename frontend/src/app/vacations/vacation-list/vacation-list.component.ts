import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseList } from 'src/app/shared/common/base-list';
import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent extends BaseList<Vacation> implements OnInit, OnDestroy {

  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    private vacationsService: VacationsService
  ) { 
    super(renderer, route, router, vacationsService);
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
