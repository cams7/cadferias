import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetails } from 'src/app/shared/common/base-details';
import { getRel } from 'src/app/shared/model/base-entity';
import { Vacation, VACATION_ENDPOINT_GET_BY_SEARCH_REL, VACATION_ENDPOINT_GET_BY_ID_REL, VACATION_ENDPOINT_DELETE_REL } from './../../shared/model/vacation';
import { HistoryService } from 'src/app/shared/history.service';

@Component({
  selector: 'app-vacation-details',
  templateUrl: './vacation-details.component.html',
  styleUrls: ['./vacation-details.component.scss']
})
export class VacationDetailsComponent extends BaseDetails<Vacation> {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected historyService: HistoryService
  ) { 
    super(route, router, historyService);
  }

  get getBySearchRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_GET_BY_SEARCH_REL);
  }

  get getByIdRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_GET_BY_ID_REL);
  }
  
  get deleteRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_DELETE_REL);
  }

}
