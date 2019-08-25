import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge, of, Subject, EMPTY, forkJoin } from 'rxjs';
import { distinctUntilChanged, takeUntil, switchMap, filter, map, shareReplay, debounceTime, flatMap, tap } from 'rxjs/operators';

import { NgBrazilValidators } from 'ng-brazil';

import { AppEventsService } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { CityVO } from './../../shared/model/vo/city-vo';
import { StateVO } from './../../shared/model/vo/state-vo';
import { BaseForm } from 'src/app/shared/common/base-form';
import { UsersService } from './../../users/users.service';
import { StaffsService } from './../../staffs/staffs.service';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';
import { Staff } from './../../shared/model/staff';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm<Employee> {

  private _cities$: Observable<CityVO[]>;
  private _states$: Observable<StateVO[]>;

  staffName$ = new Subject<string>();
  private _staffs$: Observable<Staff[]>;  
    
  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private usersService: UsersService,
    private staffsService: StaffsService,
    private employeesService: EmployeesService    
  ) { 
    super(route, eventsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      hiringDate: [super.getDate(<any>this.entity.hiringDate), Validators.required], 
      //employeePhoto: [undefined, Validators.required],
      employeeRegistration: [this.entity.employeeRegistration, Validators.required],
      name: [this.entity.name, Validators.required],
      birthDate: [super.getDate(<any>this.entity.birthDate), Validators.required],
      phoneNumber: [this.entity.phoneNumber, [Validators.required, NgBrazilValidators.telefone]],
      address: this.fb.group({
        street: [this.entity.address.street, Validators.required],
        houseNumber: [this.entity.address.houseNumber, Validators.required],
        neighborhood: [this.entity.address.neighborhood, Validators.required],
        city: [this.entity.address.city, Validators.required],
        state: [this.entity.address.state, Validators.required]
      }),
      user: this.fb.group({
        email: [this.entity.user.email, Validators.required]
      }),
      staff: this.fb.group({
        id: [this.entity.staff.id, Validators.required]
      })
    });

    this._states$ = this.employeesService.allStates$.pipe(
      shareReplay()
    );

    const cities$ = this.employeesService.allCities$.pipe(
      shareReplay()
    );

    this._cities$ = merge(
      of(this.entity.address.state).pipe(
        filter(acronym => !!acronym),
        switchMap(acronym => this._states$.pipe<StateVO>(
          map(states => states.find(state => state.acronym == acronym))
        )),
        filter(state => !!state),
        map(state => state.id),
        switchMap(stateId => cities$.pipe(
          map(cities => cities.filter(city => city.stateId == stateId))
        ))
      ),
      this.form.get('address.state').valueChanges.pipe(
        distinctUntilChanged(),
        switchMap(acronym => this._states$.pipe<StateVO>(
          map(states => states.find(state => state.acronym == acronym))
        )),
        filter(state => !!state),
        map(state => state.id),
        switchMap(stateId => cities$.pipe(
          map(cities => cities.filter(city => city.stateId == stateId))
        )),
        takeUntil(super.end$)
      )
    );
    
    this._staffs$ = merge(
      of(this.entity.staff.id).pipe(
        filter(id => !!id),
        switchMap(id => this.staffsService.getById$(id)),
        filter(staff => !!staff),
        map(staff => [staff])
      ),
      this.staffName$.pipe(
          filter(name => !!name && name.trim().length > 0),          
          debounceTime(1000),
          map(name => name.trim()),
          distinctUntilChanged(),
          switchMap(name => this.staffsService.getByName$(name)),
          takeUntil(super.end$)
        )
    );
  } 

  submit$() {
    const employee = <Employee>this.form.value;
    employee.id = this.entity.id;
    employee.birthDate = <any>super.getFormattedDate(employee.birthDate);
    employee.hiringDate = <any>super.getFormattedDate(employee.hiringDate);
    employee.phoneNumber = super.getFormattedDatePhoneNumber(employee.phoneNumber);
    employee.user.id = this.entity.user.id;
    
    return (!super.isRegistred ? this.usersService.isRegisteredEmail$(employee.user.email) : of(undefined)).pipe(
      flatMap(isRegisteredEmail => {
        let user$: Observable<User>;
        if(!super.isRegistred) {
          if(isRegisteredEmail) {
            this.eventsService.addWarningAlert('E-mail já cadastrado!', `O e-mail "${employee.user.email}" já foi cadastrado anteriormente.`);
            return EMPTY;
          }
          user$ = this.usersService.save$(employee.user);
        } else 
          user$ = of(undefined);

        return user$;
      }),
      flatMap(user => {
        if(!!user) 
          employee.user.id = user.id;
        employee.user.email = undefined;
        return this.employeesService.save$(employee);
      }),
      tap(employee => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Funcionário atualizado!', `Os dados do funcionário "${employee.name}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Funcionário cadastrado!', `O funcionário "${employee.name}" foi cadastrado com sucesso.`);  
      })
    ); 
  }

  get states$() {
    return this._states$;
  }

  get cities$() {
    return this._cities$;
  }

  get staffs$() {
    return this._staffs$;
  }

}