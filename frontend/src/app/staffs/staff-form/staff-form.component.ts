import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseForm } from 'src/app/shared/common/base-form';
import { StaffsService } from '../staffs.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm implements OnInit, OnDestroy {

  constructor(
    private staffsService: StaffsService
  ) { 
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  submit() {
  }

}
