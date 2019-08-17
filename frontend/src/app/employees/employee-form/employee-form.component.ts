import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge, of } from 'rxjs';
import { distinctUntilChanged, takeUntil, switchMap, filter, map, shareReplay } from 'rxjs/operators';

import { NgBrazilValidators } from 'ng-brazil';

import { CityVO } from './../../shared/model/vo/city-vo';
import { StateVO } from './../../shared/model/vo/state-vo';
import { BaseForm } from 'src/app/shared/common/base-form';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm {

  private _employee: Employee;

  private _cities$: Observable<CityVO[]>;
  private _states$: Observable<StateVO[]>;
    
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this._employee = this.route.snapshot.data['employee'];    

    super.form = this.fb.group({
      hiringDate: [super.getDate(<any>this._employee.hiringDate), [Validators.required]], 
      //employeePhoto: [undefined, Validators.required],
      employeeRegistration: [this._employee.employeeRegistration],
      name: [this._employee.name, Validators.required],
      birthDate: [super.getDate(<any>this._employee.birthDate), Validators.required],
      phoneNumber: [this._employee.phoneNumber, [Validators.required, NgBrazilValidators.telefone]],
      address: this.fb.group({
        street: [this._employee.address.street, [Validators.required]],
        houseNumber: [this._employee.address.houseNumber, [Validators.required]],
        neighborhood: [this._employee.address.neighborhood, [Validators.required]],
        city: [this._employee.address.city, [Validators.required]],
        state: [this._employee.address.state, [Validators.required]]
      }),
      user: this.fb.group({
        email: [this._employee.user.email]
      }),
      staff: this.fb.group({
        name: [this._employee.staff.name]
      })
    });

    this._states$ = this.employeesService.allStates$.pipe(
      shareReplay()
    );

    const cities$ = this.employeesService.allCities$.pipe(
      shareReplay()
    );

    this._cities$ = merge(
      of(this._employee.address.state).pipe(
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
  }

  submit() {
    const employee = <Employee>this.form.value;
    employee.id = this._employee.id;
    employee.birthDate = <any>super.getFormattedDate(employee.birthDate);
    employee.hiringDate = <any>super.getFormattedDate(employee.hiringDate);
    employee.phoneNumber = super.getFormattedDatePhoneNumber(employee.phoneNumber);
    employee.user.email = undefined;
    employee.staff.name = undefined;
    employee.user.id = this._employee.user.id;
    employee.staff.id = this._employee.staff.id;
    
    console.log('Employee: ', employee);
  }

  get states$() {
    return this._states$;
  }

  get cities$() {
    return this._cities$;
  }

}
