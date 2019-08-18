import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AppEventsService, SearchType } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { SortOrder } from 'src/app/shared/common/sort-field.directive';
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
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private employeesService: EmployeesService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, employeesService);
  }

  protected addModelSearch(employee: Employee) {
    this.eventsService.addEmployeeSearch(employee);
  }  

  protected getSearchType() {
    return SearchType.EMPLOYEE;
  }

  protected getModelBySearch(search: string): Employee {
    const employee = <Employee>{};  
    //employee.employeeRegistration =search;
    employee.name=search;
    //employee.phoneNumber=search; 
    //employee.address = <Address>{};  
    //employee.address.street = search;
    //employee.address.neighborhood = search;
    //employee.address.city = search;
    //if(this.isNumber(search))
    //    employee.address.houseNumber = Number(search);

    return employee;
  }

  protected getSearchByModel(employee: Employee): string {
    return super.buildMap(employee).get('name');
  }

  protected setSortFields(sortFields: Map<string, SortOrder>) {    
    sortFields.set('name', undefined);
    sortFields.set('birthDate', undefined);
    sortFields.set('hiringDate', undefined);
    sortFields.set('employeeRegistration', undefined);
    sortFields.set('staff.id', undefined);
  }

  protected getDeleteConfirmationMessage(id: number) {
    return `Tem certeza que deseja remover o funcionário "${id}"?`;
  }
}
