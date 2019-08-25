import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppEventsService } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss']
})
export class VacationFormComponent extends BaseForm<Vacation> {  
  
  constructor(
    protected route: ActivatedRoute,
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private vacationsService: VacationsService
  ) { 
    super(route, eventsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit$() {
    return EMPTY;
  }

}
