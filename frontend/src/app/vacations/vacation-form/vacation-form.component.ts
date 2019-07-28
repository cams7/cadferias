import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseForm } from 'src/app/shared/common/base-form';
import { VacationsService } from './../vacations.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss']
})
export class VacationFormComponent extends BaseForm implements OnInit, OnDestroy {

  constructor(
    private vacationsService: VacationsService
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
