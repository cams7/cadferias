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

  constructor() { 
    this.initSearchSubject();
  }

  private initSearchSubject() {
    Object.keys(SearchType).filter(key => isNaN(Number(key))).map(key => SearchType[key]).forEach(searchType => {
      this.searchSubject.set(searchType, new BehaviorSubject<any>(undefined));  
    });
  }

  addEmployeeSearch(employee?: Employee) {
    this.addModelSearch(SearchType.EMPLOYEE, employee);
  }

  addVacationSearch(vacation?: Vacation) {
    this.addModelSearch(SearchType.VACATION, vacation);
  }

  addStaffSearch(staff?: Staff) {
    this.addModelSearch(SearchType.STAFF, staff);
  }

  private addModelSearch(searchType: SearchType, modelSearch: any) {
    this.searchSubject.get(searchType).next(modelSearch);
  }

  getModelSearch$(searchType: SearchType) {
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
  }
  
  addEvent(event: AppEvent) {
    this.eventSubject.next(event);
  }

  get events$() {
    return this.eventSubject.asObservable();
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
  CONFIRM_MODAL
}

export enum AppEventType {
  MODAL_CLOSE,
  MODAL_CONFIRM_AND_CLOSE
}
