import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { BaseService } from '../shared/common/base-service';
import { Vacation } from './../shared/model/vacation';
import { VacationFilterVO } from '../shared/model/vo/filter/vacation-filter-vo';

const VACATIONS = 'vacations';
@Injectable({
  providedIn: 'root'
})
export class VacationsService extends BaseService<Vacation, VacationFilterVO> {

  constructor(
    protected http: HttpClient
  ) { 
    super(http, `${environment.API}${VACATIONS}`);
  }  
}
