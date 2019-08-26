import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { filter, tap, flatMap } from 'rxjs/operators';

import { AppEventsService, SearchType } from './../../shared/events.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { SortOrder } from './../../shared/common/sort-field.directive';
import { BaseList } from './../../shared/common/base-list';
import { UsersService } from './../../users/users.service';
import { EmployeesService } from '../employees.service';
import { VacationsService } from './../../vacations/vacations.service';
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
    private usersService: UsersService,
    private employeesService: EmployeesService,
    private vacationsService: VacationsService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, employeesService);
  }

  protected addEntitySearch(employee: Employee) {
    this.eventsService.addEmployeeSearch(employee);
  }  

  protected getSearchType() {
    return SearchType.EMPLOYEE;
  }

  protected getEntityBySearch(search: string): Employee {
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

  protected getSearchByEntity(employee: Employee): string {
    return super.buildMap(employee).get('name');
  }

  protected setSortFields(sortFields: Map<string, SortOrder>) {    
    sortFields.set('name', undefined);
    sortFields.set('birthDate', undefined);
    sortFields.set('hiringDate', undefined);
    sortFields.set('employeeRegistration', undefined);
    sortFields.set('staff.id', undefined);
  }

  protected delete$(employee: Employee): Observable<void> {
    return this.confirmModalService.showConfirm$('Confirmação', `Tem certeza que deseja remover o(a) funcionário(a) "${employee.name}"?`).pipe(
      filter(confirmed => confirmed),
      flatMap(_ => this.vacationsService.totalVacations$(employee.id)),
      flatMap(totalVacations => {
        if(totalVacations > 0) {
          this.eventsService.addWarningAlert('Tem férias!', `O(A) funcionário(a) "${employee.name}" não pode ser excluído(a), porque esse(a) tem ${totalVacations} férias cadastrada(s).`)
          return EMPTY;
        }
        return this.usersService.remove$(employee.user.id)
      }),
      flatMap(_ => this.employeesService.remove$(employee.id)),
      tap(_ => this.eventsService.addSuccessAlert('Funcionário(a) excluído(a)!', `O(A) funcionário(a) "${employee.name}" foi excluido(a) com sucesso.`))
    );
  }
}
