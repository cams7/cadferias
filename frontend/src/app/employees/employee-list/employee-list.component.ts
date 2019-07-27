import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseList } from 'src/app/shared/common/base-list';

import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends BaseList implements OnInit, OnDestroy {
  
  constructor(
    private employeesService: EmployeesService
  ) { 
    super()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
