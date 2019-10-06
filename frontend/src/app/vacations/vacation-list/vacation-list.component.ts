import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { Direction } from 'src/app/shared/model/vo/pagination/sort-vo';
import { BaseList } from './../../shared/common/base-list';
import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';
import { FilterType } from 'src/app/shared/model/vo/filter/auditable-filter-vo';
import { VacationFilterVO } from 'src/app/shared/model/vo/filter/vacation-filter-vo';
import { EmployeeFilterVO } from './../../shared/model/vo/filter/employee-filter-vo';
import { StaffFilterVO } from 'src/app/shared/model/vo/filter/staff-filter-vo';


@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent extends BaseList<Vacation, VacationFilterVO> {
            
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: EventsService,
    protected confirmModalService: ConfirmModalService,
    private vacationsService: VacationsService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, vacationsService);
  }
  
  protected addFilter(vacation: VacationFilterVO) {
    this.eventsService.addVacationFilter(vacation);
  } 
  
  protected getFilterType() {
    return FilterType.VACATION;
  }

  protected getFilterBySearch(search: string): VacationFilterVO {
    const vacation = <VacationFilterVO>{};
    vacation.employee = <EmployeeFilterVO>{};
    //vacation.employee.employeeRegistration = search;
    vacation.employee.name = search;
    //vacation.employee.phoneNumber = search;
    //vacation.employee.address = <AddressFilterVO>{};
    //vacation.employee.address.street = search;
    //vacation.employee.address.neighborhood = search;
    //vacation.employee.address.city = search;
    //vacation.employee.user = <UserFilterVO>{};
    //vacation.employee.user.email = search;
    vacation.employee.staff = <StaffFilterVO>{};
    vacation.employee.staff.name = search;
    return vacation;
  }

  protected getSearchByFilter(vacation: VacationFilterVO): string {
    return vacation.employee.name;
  }

  protected setSortFields(sortFields: Map<string, Direction>) {
    sortFields.set('startDate', undefined);
    sortFields.set('endDate', undefined);
    sortFields.set('employee.name', undefined);
    sortFields.set('employee.staff.name', undefined);
  }

  protected delete$(vacation: Vacation): Observable<void> {
    return this.confirmModalService.showConfirm$('Confirmação', `Tem certeza que deseja remover a férias "${vacation.id}"?`).pipe(
      filter(confirmed => confirmed),            
      switchMap(_ => this.vacationsService.remove$(vacation.id)),
      tap(_ => this.eventsService.addSuccessAlert('Férias excluída!', `A férias "${vacation.id}" foi excluida com sucesso.`))
    );
  }

}
