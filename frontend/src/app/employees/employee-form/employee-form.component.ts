import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge, of, Subject, forkJoin } from 'rxjs';
import { distinctUntilChanged, takeUntil, switchMap, filter, map, shareReplay, debounceTime, flatMap, tap } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ErrorsService } from 'src/app/shared/errors.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { CityVO } from '../../shared/model/vo/address/city-vo';
import { StateVO } from '../../shared/model/vo/address/state-vo';
import { BaseForm } from './../../shared/common/base-form';
import { StaffsService } from './../../staffs/staffs.service';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';
import { Staff } from './../../shared/model/staff';
import { EmployeePhoto, ImageType } from './../../shared/model/employee-photo';

const EMPLOYEE_PHOTO = 'assets/img/employee-avatar.png';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm<Employee> implements AfterViewInit {
  
  stateName$ = new Subject<string>();
  private _states$: Observable<StateVO[]>;

  cityName$ = new Subject<string>();
  private _cities$: Observable<CityVO[]>;

  staffName$ = new Subject<string>();
  private _staffs$: Observable<Staff[]>; 
  
  readonly acceptedImageTypes = '.png,.jpg,.jpeg';
  private photoChanged = false;

  @ViewChild('imagePreview', { read: ElementRef, static:true }) imagePreview: ElementRef;
     
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private eventsService: EventsService,
    protected errorsService: ErrorsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService,
    private employeesService: EmployeesService    
  ) { 
    super(route, errorsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();
    
    super.form = this.fb.group({
      hiringDate: [super.getDate(<any>super.entity.hiringDate)], 
      photo: [this.photo],
      employeeRegistration: [super.entity.employeeRegistration],
      name: [super.entity.name],
      birthDate: [super.getDate(<any>super.entity.birthDate)],
      phoneNumber: [super.entity.phoneNumber],
      address: this.fb.group({
        street: [super.entity.address.street],
        houseNumber: [super.entity.address.houseNumber],
        neighborhood: [super.entity.address.neighborhood],
        city: [super.entity.address.city],
        state: [super.entity.address.state]
      }),
      user: this.fb.group({
        email: [super.entity.user.email]
      }),
      staff: this.fb.group({
        id: [super.entity.staff.id]
      })
    });

    const states$ = this.employeesService.allStates$.pipe(
      shareReplay()
    );

    this._states$ = merge(
      of(super.entity.address.state).pipe(
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
      of(super.entity.address.city).pipe(
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
      of(super.entity.staff.id).pipe(
        filter(id => !!id),
        flatMap(id => this.staffsService.getById$(id)),
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

  ngAfterViewInit() {
    const photo = this.photo;
    this.renderer.setStyle(this.imagePreview.nativeElement, 'background-image', `url(${!!photo ? photo : EMPLOYEE_PHOTO})`);
  }

  submit$() {
    const employee = <Employee>this.form.value;
    employee.id = super.entity.id;
    employee.birthDate = <any>super.getFormattedDate(employee.birthDate);
    employee.hiringDate = <any>super.getFormattedDate(employee.hiringDate);
    employee.phoneNumber = super.getFormattedDatePhoneNumber(employee.phoneNumber);
    employee.user.id = this.userId;
    employee.staff = this.staff;
    
    const photo: string = (<any>employee).photo;
    if(this.photoChanged && photo && photo.match(/^data\:image\/(png|jpg|jpeg)\;base64\,([A-Za-z0-9\/\+\=]+)$/g)) {
      const photos = super.entity.photos;
      const employeePhoto = photos && photos.length > 0 ? photos[0] : <EmployeePhoto>{};
      employeePhoto.imageType = <ImageType>photo.match(/(png|jpg|jpeg)/g)[0].toUpperCase();
      employeePhoto.photo = photo.match(/([A-Za-z0-9\/\+\=]+)$/g)[0];

      employee.photos = [employeePhoto];   
    } else 
      employee.photos = undefined;

    (<any>employee).photo = undefined;
    
    return this.employeesService.save$(employee).pipe(      
      tap(employee => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Funcionário(a) atualizado(a)!', `Os dados do(a) funcionário(a) "${employee.name}" foram atualizados com sucesso.`);
        else {
            this.form.patchValue({employeeRegistration: employee.employeeRegistration});
            this.eventsService.addSuccessAlert('Funcionário(a) cadastrado(a)!', `O(A) funcionário(a) "${employee.name}" foi cadastrado(a) com sucesso.`);  
        }
        this.photoChanged = false;
      })
    ); 
  }

  private get photo() {
    if(!super.entity.photos || super.entity.photos.length < 1)
      return undefined;

    const photo = super.entity.photos[0];
    return `data:image/${photo.imageType.toLowerCase()};base64,${photo.photo}`;
  }


  changePhoto(event: Event) {
    const files: FileList = (<any>event.target).files;
	  if (files && files.length == 1) {
      const file = files.item(0);
      const reader = new FileReader();
      reader.onload = progressEvent => {
        const image = (<any>progressEvent.target).result;
        this.renderer.removeStyle(this.imagePreview.nativeElement, 'background-image');
        this.renderer.setStyle(this.imagePreview.nativeElement, 'background-image', `url(${image})`);
        this.form.patchValue({photo: image});
        this.form.get('photo').markAsTouched();
        this.form.get('photo').markAsDirty();
        this.photoChanged = true;
      };
      reader.readAsDataURL(file);
	  }
  }

  get userId() {
    return super.entity.user.id;
  }

  get staff() {
    const employee = <Employee>this.form.value;
    if(!employee.staff || !employee.staff.id)
      return undefined;
    
    return employee.staff;
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