import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { EventsService, SearchType } from 'src/app/shared/events.service';
import { BaseList } from 'src/app/shared/common/base-list';
import { StaffsService } from '../staffs.service';
import { Staff } from './../../shared/model/staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent extends BaseList<Staff> {

  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: EventsService,
    private staffsService: StaffsService
  ) { 
    super(renderer, route, router, fb, eventsService, staffsService);
  }

  protected addSearch(search: string) {
    this.eventsService.addStaffSearch(search);
  }  

  protected getSearchType() {
    return SearchType.STAFF;
  }

}
