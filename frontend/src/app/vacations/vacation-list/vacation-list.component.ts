import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { EventsService, SearchType } from 'src/app/shared/events.service';
import { BaseList } from 'src/app/shared/common/base-list';
import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent extends BaseList<Vacation> {
  
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: EventsService,
    private vacationsService: VacationsService
  ) { 
    super(renderer, route, router, fb, eventsService, vacationsService);
  }
  
  protected addModelSearch(vacation: Vacation) {
    this.eventsService.addVacationSearch(vacation);
  } 
  
  protected getSearchType() {
    return SearchType.VACATION;
  }

  protected getModelBySearch(search: string): Vacation {
    return undefined;
  }

  protected getSearchByModel(vacation: Vacation): string {
    return undefined;
  }

}
