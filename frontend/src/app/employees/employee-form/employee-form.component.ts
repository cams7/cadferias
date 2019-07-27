import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseForm } from 'src/app/shared/common/base-form';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm implements OnInit, OnDestroy {
  
  constructor(
    private employeesService: EmployeesService
  ) { 
    super()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  unchangedData(): Observable<boolean> {
    return of(true);
  }

}
