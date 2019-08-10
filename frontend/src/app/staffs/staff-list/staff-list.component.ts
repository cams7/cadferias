import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { BaseList } from 'src/app/shared/common/base-list';
import { StaffsService } from '../staffs.service';
import { Staff } from './../../shared/model/staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent extends BaseList<Staff> implements OnInit, OnDestroy {

  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    private staffsService: StaffsService
  ) { 
    super(renderer, route, router, fb, staffsService);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
