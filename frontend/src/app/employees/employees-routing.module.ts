import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleName } from '../shared/model/role';
import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { EmployeeResolver } from './guards/employee.resolver';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [ 
  {
    path: 'register',
    component: EmployeeFormComponent,
    resolve: { entity : EmployeeResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_REGISTER_NEW_EMPLOYEE
    ] }
  },
  {
    path: ':id/details',
    component: EmployeeDetailsComponent,
    resolve: { entity : EmployeeResolver },
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_VIEW_EMPLOYEE_DETAILS
    ] }
  },
  {
    path: ':id',
    component: EmployeeFormComponent,
    resolve: { entity : EmployeeResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_UPDATE_EMPLOYEE_DATA
    ] }
  },
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_EMPLOYEES
    ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
