import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: ':id/details',
    component: EmployeeDetailsComponent,
    resolve: { entity : EmployeeResolver }
  },
  {
    path: ':id',
    component: EmployeeFormComponent,
    resolve: { entity : EmployeeResolver },
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: '',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
