import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { StaffResolverGuard } from './guards/staff-resolver.guard';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  {
    path: 'register',
    component: StaffFormComponent,
    resolve: { staff : StaffResolverGuard }
  },
  {
    path: ':id',
    component: StaffFormComponent,
    resolve: { staff : StaffResolverGuard },
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: '',
    component: StaffListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
