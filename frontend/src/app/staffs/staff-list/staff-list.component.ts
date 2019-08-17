import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AppEventsService, SearchType } from 'src/app/shared/events.service';
import { SortOrder } from 'src/app/shared/common/sort-field.directive';
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
    protected eventsService: AppEventsService,
    private staffsService: StaffsService
  ) { 
    super(renderer, route, router, fb, eventsService, staffsService);
  }

  protected addModelSearch(staff: Staff) {
    this.eventsService.addStaffSearch(staff);
  }  

  protected getSearchType() {
    return SearchType.STAFF;
  }

  protected getModelBySearch(search: string): Staff {
    const staff = <Staff>{};
    staff.name = search;
    return staff;
  }

  protected getSearchByModel(staff: Staff): string {
    return super.buildMap(staff).get('name');
  }

  protected setSortFields(sortFields: Map<string, SortOrder>) {
    sortFields.set('name', undefined);
  }

}
