import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AppEventsService, SearchType } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { SortOrder } from 'src/app/shared/common/sort-field.directive';
import { BaseList } from 'src/app/shared/common/base-list';
import { VacationsService } from './../vacations.service';
import { Vacation } from './../../shared/model/vacation';
import { Employee } from 'src/app/shared/model/employee';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent extends BaseList<Vacation> {
            
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private vacationsService: VacationsService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, vacationsService);
  }
  
  protected addEntitySearch(vacation: Vacation) {
    this.eventsService.addVacationSearch(vacation);
  } 
  
  protected getSearchType() {
    return SearchType.VACATION;
  }

  protected getEntityBySearch(search: string): Vacation {
    const vacation = <Vacation>{};
    vacation.employee = <Employee>{};
    if(this.isNumber(search))
      vacation.employee.id = Number(search);
    return vacation;
  }

  protected getSearchByEntity(vacation: Vacation): string {
    return super.buildMap(vacation).get('employee.id');
  }

  protected setSortFields(sortFields: Map<string, SortOrder>) {
    sortFields.set('vacationStartDate', undefined);
    sortFields.set('vacationEndDate', undefined);
    sortFields.set('employee.id', undefined);
  }

  protected delete$(vacation: Vacation): Observable<void> {
    return this.confirmModalService.showConfirm$('Confirmação', `Tem certeza que deseja remover a férias "${vacation.id}"?`).pipe(
      filter(confirmed => confirmed),            
      switchMap(_ => this.vacationsService.remove$(vacation.id)),
      tap(_ => this.eventsService.addSuccessAlert('Férias excluída!', `A férias "${vacation.id}" foi excluida com sucesso.`))
    );
  }

}
