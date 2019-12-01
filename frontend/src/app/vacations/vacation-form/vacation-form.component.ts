import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, merge, of } from 'rxjs';
import { tap, filter, flatMap, map, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ErrorsService } from 'src/app/shared/errors.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { BaseForm } from './../../shared/common/base-form';
import { EmployeesService } from './../../employees/employees.service';
import { VacationsService } from './../vacations.service';
import { Employee } from './../../shared/model/employee';
import { Vacation, VACATION_ENDPOINT_GET_BY_SEARCH_REL, VACATION_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL, VACATION_ENDPOINT_UPDATE_REL } from './../../shared/model/vacation';
import { getRel } from 'src/app/shared/model/base-entity';
import { HistoryService } from 'src/app/shared/history.service';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styleUrls: ['./vacation-form.component.scss']
})
export class VacationFormComponent extends BaseForm<Vacation> {  

  employeeName$ = new Subject<string>();
  private _employees$: Observable<Employee[]>; 
  
  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected historyService: HistoryService,
    private eventsService: EventsService,
    protected errorsService: ErrorsService,
    protected confirmModalService: ConfirmModalService,
    private employeesService: EmployeesService,
    private vacationsService: VacationsService
  ) { 
    super(route, router, historyService, errorsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.form = this.fb.group({
      vacationDate: [this.vacationDate],
      employee: this.fb.group({
        entityId: [this.entity.employee.entityId],
        employeeRegistration: [this.entity.employee.employeeRegistration],
        phoneNumber: [this.entity.employee.phoneNumber],
        user: this.fb.group({
          email: [this.entity.employee.user.email]
        }),
        staff: this.fb.group({
          name: [this.entity.employee.staff.name]
        })
      }) 
    });

    this.form.get('employee.entityId').valueChanges.pipe(
      filter(employeeId => !!employeeId),
      distinctUntilChanged(),
      switchMap(employeeId => this.employeesService.getByIdWithoutPhotos$(employeeId)),
      filter(employee => !!employee),
      takeUntil(this.end$)
    ).subscribe(employee => {
      this.entity.employee = employee;
      this.form.get('employee').patchValue(employee);
    })

    this._employees$ = merge(
      of(this.entity.employee).pipe(
        filter(employee => !!employee && !!employee.entityId),
        map(employee => [employee])
      ),
      this.employeeName$.pipe(
          filter(name => !!name && name.trim().length > 0),          
          debounceTime(this.debounceTime),
          map(name => name.trim()),
          distinctUntilChanged(),
          switchMap(name => this.employeesService.getByName$(name)),
          takeUntil(this.end$)
        )
    );

  }

  private get vacationDate(): Date[] {
    const vacationDate: Date[] = [undefined, undefined];
    if (!!this.entity.startDate)
      vacationDate[0]= <Date>this.getDate(<any>this.entity.startDate);

    if (!!this.entity.endDate)
    vacationDate[1]= <Date>this.getDate(<any>this.entity.endDate);

    return vacationDate;
  }

  submit$() {
    const vacation = <Vacation>this.form.value;       
    vacation.startDate = this.startDate;
    vacation.endDate = this.endDate;
    (<any>vacation).vacationDate = undefined; 
    vacation.entityId = this.entity.entityId;
    vacation.employee = this.employee;
        
    return this.vacationsService.save$(vacation).pipe(
      tap(vacation => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Férias atualizada!', `Os dados da férias "${vacation.entityId}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Férias cadastrada!', `A férias foi cadastrada com sucesso.`);  
      })
    );
  }

  get startDate(): Date {
    const vacationDate: Date[] = this.form.get('vacationDate').value;
    if(!vacationDate[0])
      return undefined;

    return <any>this.getFormattedDate(vacationDate[0]);
  }

  get endDate(): Date {
    const vacationDate: Date[] = this.form.get('vacationDate').value;
    if(!vacationDate[1])
      return undefined;

    return <any>this.getFormattedDate(vacationDate[1]);
  }

  get employee() {
    const vacation = <Vacation>this.form.value;
    const employee = vacation.employee;

    if(!employee || !employee.entityId)
      return undefined;
    
    employee.employeeRegistration = undefined;
    employee.phoneNumber = undefined;
    employee.user = undefined;
    employee.staff = undefined;

    return employee;
  }

  get employees$() {
    return this._employees$;
  }

  get getBySearchRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_GET_BY_SEARCH_REL);
  }

  get getWithAuditByIdRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL);
  }

  get updateRel() {
    return getRel(this.entity._links, VACATION_ENDPOINT_UPDATE_REL);
  }

  get submitTooltip() {
    if(!this.entity._links)
      return "Salvar os dados das férias";
    return this.updateRel.title;
  }

}
