import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge, of, Subject, forkJoin } from 'rxjs';
import { distinctUntilChanged, takeUntil, switchMap, filter, map, shareReplay, debounceTime, flatMap, tap } from 'rxjs/operators';

import { NgBrazilValidators } from 'ng-brazil';

import { AppEventsService } from './../../shared/events.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { CityVO } from './../../shared/model/vo/city-vo';
import { StateVO } from './../../shared/model/vo/state-vo';
import { BaseForm } from './../../shared/common/base-form';
import { UsersService } from './../../users/users.service';
import { StaffsService } from './../../staffs/staffs.service';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';
import { Staff } from './../../shared/model/staff';
import { User } from './../../shared/model/user';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm<Employee> {

  stateName$ = new Subject<string>();
  private _states$: Observable<StateVO[]>;

  cityName$ = new Subject<string>();
  private _cities$: Observable<CityVO[]>;

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

    const states$ = this.employeesService.allStates$.pipe(
      shareReplay()
    );

    this._states$ = merge(
      of(this.entity.address.state).pipe(
        filter(acronym => !!acronym),
        flatMap(acronym => states$.pipe<StateVO>(
          map(states => states.find(state => state.acronym == acronym))
        )),
        filter(state => !!state),
        map(state => [state])
      ),
      this.stateName$.pipe(
        filter(name => !!name && name.trim().length > 0),
        debounceTime(super.debounceTime),
        map(name => name.trim().toLowerCase()),
        distinctUntilChanged(),
        switchMap(name => states$.pipe<StateVO[]>(
          map(states => states.filter(state => !!state && new RegExp(name, 'i').test(state.name.trim().toLowerCase())))
        )),
        takeUntil(super.end$)
      )
    );

    const cities$ = this.employeesService.allCities$.pipe(
      shareReplay()
    );

    this._cities$ = merge(
      of(this.entity.address.city).pipe(
        filter(name => !!name && !!this.form.get('address.state').value),
        flatMap(name => forkJoin(
          of(name), 
          states$.pipe<StateVO>(
            map(states => states.find(state => state.acronym == this.form.get('address.state').value))
          ), 
          cities$
        )),
        map(([name, state, cities]) => cities.find(city => city.stateId == state.id && city.name == name)),
        filter(city => !!city),
        map(city => [city])
      ),
      this.cityName$.pipe(
        filter(name => !!name && name.trim().length > 0 && !!this.form.get('address.state').value),
        debounceTime(super.debounceTime),
        map(name => name.trim().toLowerCase()),
        distinctUntilChanged(),
        flatMap(name => forkJoin(
          of(name), 
          states$.pipe<StateVO>(
            map(states => states.find(state => state.acronym == this.form.get('address.state').value))
          ), 
          cities$
        )),
        map(([name, state, cities]) => cities.filter(city => 
          !!city && city.stateId == state.id && new RegExp(name, 'i').test(city.name.trim().toLowerCase())          
        )),
        takeUntil(super.end$)
      )
    );
    
    this._staffs$ = merge(
      of(this.entity.staff.id).pipe(
        filter(id => !!id),
        flatMap(id => this.staffsService.getOnlyStaffById$(id)),
        filter(staff => !!staff),
        map(staff => [staff])
      ),
      this.staffName$.pipe(
          filter(name => !!name && name.trim().length > 0),          
          debounceTime(super.debounceTime),
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
    
    return this.employeesService.save$(employee).pipe(      
      tap(employee => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Funcionário(a) atualizado(a)!', `Os dados do(a) funcionário(a) "${employee.name}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Funcionário(a) cadastrado(a)!', `O(A) funcionário(a) "${employee.name}" foi cadastrado(a) com sucesso.`);  
      })
    ); 
  }

  trackByAcronym(state: StateVO) {
    return state.acronym;
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