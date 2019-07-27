import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { EmployeeResolverGuard } from './guards/employee-resolver.guard';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [ 
  {
    path: 'register',
    component: EmployeeFormComponent,
    resolve: { employee : EmployeeResolverGuard }
  },
  {
    path: ':id',
    component: EmployeeFormComponent,
    resolve: { employee : EmployeeResolverGuard },
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
