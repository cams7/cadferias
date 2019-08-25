import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from './model/employee';
import { Vacation } from './model/vacation';
import { Staff } from './model/staff';

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {

  private searchSubject = new Map<SearchType, BehaviorSubject<any>>();
  private eventSubject = new Subject<AppEvent>();
  private alertSubject = new Subject<AlertMessage>();

  constructor() { 
    this.initSearchSubject();
  }

  private initSearchSubject() {
    Object.keys(SearchType).filter(key => isNaN(Number(key))).map(key => SearchType[key]).forEach(searchType => {
      this.searchSubject.set(searchType, new BehaviorSubject<any>(undefined));  
    });
  }

  addEmployeeSearch(employee?: Employee) {
    this.addEntitySearch(SearchType.EMPLOYEE, employee);
  }

  addVacationSearch(vacation?: Vacation) {
    this.addEntitySearch(SearchType.VACATION, vacation);
  }

  addStaffSearch(staff?: Staff) {
    this.addEntitySearch(SearchType.STAFF, staff);
  }

  private addEntitySearch(searchType: SearchType, entitySearch: any) {
    this.searchSubject.get(searchType).next(entitySearch);
  }

  getEntitySearch$(searchType: SearchType) {
    return this.searchSubject.get(searchType).asObservable();
  }

  resetAllSearchs() {
    this.addEmployeeSearch();
    this.addVacationSearch();
    this.addStaffSearch();
  }

  endAllEvents() {
    Array.from(this.searchSubject.keys()).forEach(searchType => 
      this.searchSubject.get(searchType).complete()
    );
    this.searchSubject.clear();
    this.eventSubject.complete();
    this.alertSubject.complete();
  }
  
  addEvent(event: AppEvent) {
    this.eventSubject.next(event);
  }

  get events$() {
    return this.eventSubject.asObservable();
  }

  addSuccessAlert(title: string, message: string, timeout?: number) {
    this.addAlert(AlertType.SUCCESS, title, message, timeout);
  }

  addInfoAlert(title: string, message: string, timeout?: number) {
    this.addAlert(AlertType.INFO, title, message, timeout);
  }

  addWarningAlert(title: string, message: string, timeout?: number) {
    this.addAlert(AlertType.WARNING, title, message, timeout);
  }

  addDangerAlert(title: string, message: string, timeout?: number) {
    this.addAlert(AlertType.DANGER, title, message, timeout);
  }

  private addAlert(type: AlertType, title: string, message: string, timeout?: number) {
    const alert = <AlertMessage> {
      type: type,
      title: title,
      message: message,
      timeout: timeout? timeout: 5000
    };
    this.alertSubject.next(alert);
  }

  get alert$() {
    return this.alertSubject.asObservable();
  }
}

export enum SearchType {
  EMPLOYEE,
  VACATION,
  STAFF
}

export interface AppEvent {
  from: AppEventFrom,
  type: AppEventType
}

export enum AppEventFrom {
  CONFIRM_MODAL,
  SIGNIN_MODAL
}

export enum AppEventType {
  MODAL_CLOSE,
  MODAL_CONFIRM_AND_CLOSE
}

export interface AlertMessage {
  type: AlertType;
  title: string;
  message: string;  
  timeout: number;
}

export enum AlertType {
  SUCCESS='success',
  INFO='info',
  WARNING='warning',
  DANGER='danger'
}
