import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';


@NgModule({
  declarations: [
    StaffListComponent, 
    StaffFormComponent, 
    StaffDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StaffsRoutingModule
  ]
})
export class StaffsModule { }
