import { Component } from '@angular/core';

import { BaseForm } from 'src/app/shared/common/base-form';
import { StaffsService } from '../staffs.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm {

  constructor(
    private staffsService: StaffsService
  ) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit() {
  }

}
