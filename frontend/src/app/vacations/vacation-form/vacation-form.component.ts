import { Component } from '@angular/core';

import { BaseForm } from 'src/app/shared/common/base-form';
import { VacationsService } from './../vacations.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss']
})
export class VacationFormComponent extends BaseForm {

  constructor(
    private vacationsService: VacationsService
  ) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit() {
  }

}
