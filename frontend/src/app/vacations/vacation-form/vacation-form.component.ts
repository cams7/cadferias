import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, merge, of } from 'rxjs';
import { tap, filter, flatMap, map, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { AppEventsService } from './../../shared/events.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { BaseForm } from './../../shared/common/base-form';
import { EmployeesService } from './../../employees/employees.service';
import { VacationsService } from './../vacations.service';
import { Employee } from './../../shared/model/employee';
import { Vacation } from './../../shared/model/vacation';

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
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private employeesService: EmployeesService,
    private vacationsService: VacationsService
  ) { 
    super(route, eventsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      vacationDate: [this.vacationDate, Validators.required],
      employee: this.fb.group({
        id: [this.entity.employee.id, Validators.required],
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

    this.form.get('employee.id').valueChanges.pipe(
      filter(employeeId => !!employeeId),
      distinctUntilChanged(),
      switchMap(employeeId => this.employeesService.getById$(employeeId)),
      filter(employee => !!employee),
      takeUntil(super.end$)
    ).subscribe(employee => {
      this.entity.employee = employee;
      this.form.get('employee').patchValue(employee);
    })

    this._employees$ = merge(
      of(this.entity.employee.id).pipe(
        filter(id => !!id),
        flatMap(id => this.employeesService.getById$(id)),
        filter(employee => !!employee),
        map(employee => [employee])
      ),
      this.employeeName$.pipe(
          filter(name => !!name && name.trim().length > 0),          
          debounceTime(super.debounceTime),
          map(name => name.trim()),
          distinctUntilChanged(),
          switchMap(name => this.employeesService.getByName$(name)),
          takeUntil(super.end$)
        )
    );

  }

  private get vacationDate(): Date[] {
    if (!this.entity.startDate || !this.entity.endDate)
      return undefined;

    return  [
      <Date>super.getDate(<any>this.entity.startDate),
      <Date>super.getDate(<any>this.entity.endDate)
    ]
  }

  submit$() {
    const vacationDate: Date[] = this.form.get('vacationDate').value;

    const vacation = <Vacation>this.form.value;       
    vacation.startDate = <any>super.getFormattedDate(vacationDate[0]);
    vacation.endDate = <any>super.getFormattedDate(vacationDate[1]);
    (<any>vacation).vacationDate = undefined; 
    vacation.id = this.entity.id;
    vacation.employee.employeeRegistration = undefined;
    vacation.employee.phoneNumber = undefined;
    vacation.employee.user = undefined;
    vacation.employee.staff = undefined;    

    return this.vacationsService.save$(vacation).pipe(
      tap(vacation => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Férias atualizada!', `Os dados da férias "${vacation.id}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Férias cadastrada!', `A férias foi cadastrada com sucesso.`);  
      })
    );
  }

  get employees$() {
    return this._employees$;
  }

}
