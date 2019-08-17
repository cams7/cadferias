import { Component } from '@angular/core';

import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { StaffsService } from '../staffs.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm {

  constructor(
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit() {
  }

}
