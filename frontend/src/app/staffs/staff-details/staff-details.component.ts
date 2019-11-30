import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetails } from 'src/app/shared/common/base-details';
import { getRel } from 'src/app/shared/model/base-entity';
import { Staff, STAFF_ENDPOINT_GET_BY_SEARCH_REL, STAFF_ENDPOINT_GET_BY_ID_REL, STAFF_ENDPOINT_DELETE_REL } from 'src/app/shared/model/staff';
import { HistoryService } from 'src/app/shared/history.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent extends BaseDetails<Staff> {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected historyService: HistoryService
  ) { 
    super(route, router, historyService);
  }

  get getBySearchRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_GET_BY_SEARCH_REL);
  }

  get getByIdRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_GET_BY_ID_REL);
  }
  
  get deleteRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_DELETE_REL);
  }

}
