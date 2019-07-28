import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseList } from 'src/app/shared/common/base-list';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends BaseList implements OnInit, OnDestroy {

  private _employees$: Observable<Employee[]>;
  
  constructor(
    private employeesService: EmployeesService
  ) { 
    super();
  }

  ngOnInit() {
    this._employees$ = this.employeesService.getAll();
  }

  ngOnDestroy() {
  }

  get employees$() {
    return this._employees$;
  }

}
