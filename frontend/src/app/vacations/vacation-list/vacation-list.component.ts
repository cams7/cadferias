import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseList } from 'src/app/shared/common/base-list';
import { VacationsService } from './../vacations.service';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent extends BaseList implements OnInit, OnDestroy {

  constructor(
    private vacationsService: VacationsService
  ) { 
    super();
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
