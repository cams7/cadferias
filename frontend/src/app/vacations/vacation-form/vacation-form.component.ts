import { Component } from '@angular/core';

import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { VacationsService } from './../vacations.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss']
})
export class VacationFormComponent extends BaseForm {

  constructor(
    protected confirmModalService: ConfirmModalService,
    private vacationsService: VacationsService
  ) { 
    super(confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit() {
  }

}
