import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { filter, shareReplay, map, tap, last, distinctUntilKeyChanged, defaultIfEmpty, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private searchSubject = new Map<SearchType, BehaviorSubject<string>>();

  constructor() { 
    this.initSearchSubject();
  }

  private initSearchSubject() {
    Object.keys(SearchType).filter(key => isNaN(Number(key))).map(key => SearchType[key]).forEach(searchType => {
      this.searchSubject.set(searchType, new BehaviorSubject<string>(undefined));  
    });
  }

  addEmployeeSearch(search?: string) {
    this.addSearch(SearchType.EMPLOYEE, search);
  }

  addVacationSearch(search?: string) {
    this.addSearch(SearchType.VACATION, search);
  }

  addStaffSearch(search?: string) {
    this.addSearch(SearchType.STAFF, search);
  }

  private addSearch(searchType: SearchType, search: string) {
    this.searchSubject.get(searchType).next(search);
  }

  getSearch$(searchType: SearchType) {
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
  }  
}

export enum SearchType {
  EMPLOYEE,
  VACATION,
  STAFF
}
