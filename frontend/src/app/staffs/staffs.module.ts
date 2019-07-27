import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';


@NgModule({
  declarations: [
    StaffListComponent, 
    StaffFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaffsRoutingModule
  ]
})
export class StaffsModule { }
