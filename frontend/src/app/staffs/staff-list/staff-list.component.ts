import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseList } from 'src/app/shared/common/base-list';
import { StaffsService } from '../staffs.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent extends BaseList implements OnInit, OnDestroy {

  constructor(
    private staffsService: StaffsService
  ) { 
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
