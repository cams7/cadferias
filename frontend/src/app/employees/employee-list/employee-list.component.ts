import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { EventsService, SearchType } from 'src/app/shared/events.service';
import { BaseList } from 'src/app/shared/common/base-list';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends BaseList<Employee> {
    
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,    
    protected eventsService: EventsService,
    private employeesService: EmployeesService
  ) { 
    super(renderer, route, router, fb, eventsService, employeesService);
  }

  protected addSearch(search: string) {
    this.eventsService.addEmployeeSearch(search);
  }  

  protected getSearchType() {
    return SearchType.EMPLOYEE;
  }

}
