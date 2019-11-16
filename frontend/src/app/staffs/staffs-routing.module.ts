import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleName } from '../shared/model/role';
import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { StaffResolver } from './guards/staff.resolver';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';

const routes: Routes = [
  {
    path: 'register',
    component: StaffFormComponent,
    resolve: { entity : StaffResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_REGISTER_NEW_STAFF
    ] }
  },
  {
    path: ':id/details',
    component: StaffDetailsComponent,
    resolve: { entity : StaffResolver },
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_VIEW_STAFF_DETAILS
    ] }
  },
  {
    path: ':id',
    component: StaffFormComponent,
    resolve: { entity : StaffResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_UPDATE_STAFF_DATA
    ] }
  },
  {
    path: '',
    component: StaffListComponent,
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_STAFFS
    ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
