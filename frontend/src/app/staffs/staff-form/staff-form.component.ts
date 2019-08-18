import { Component } from '@angular/core';

import { AppEventsService } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { StaffsService } from '../staffs.service';
import { Staff } from 'src/app/shared/model/staff';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm<Staff> {

  constructor(
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(eventsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit$() {
    return EMPTY;
  }

  protected getCreateSuccessMessage() {
    return `A equipe foi criada com sucesso.`;
  }
  protected getUpdateSuccessMessage(id: number) {
    return `Os dados da equipe "${id}" foram atualizados com sucesso.`;
  }

}
