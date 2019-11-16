import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleName } from '../shared/model/role';
import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { VacationResolver } from './guards/vacation.resolver';
import { VacationFormComponent } from './vacation-form/vacation-form.component';
import { VacationListComponent } from './vacation-list/vacation-list.component';
import { VacationDetailsComponent } from './vacation-details/vacation-details.component';

const routes: Routes = [
  {
    path: 'register',
    component: VacationFormComponent,
    resolve: { entity : VacationResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_REGISTER_NEW_VACATION
    ] }
  },
  {
    path: ':id/details',
    component: VacationDetailsComponent,
    resolve: { entity : VacationResolver },
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_VIEW_VACATION_DETAILS
    ] }
  },
  {
    path: ':id',
    component: VacationFormComponent,
    resolve: { entity : VacationResolver },
    canDeactivate: [FormDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_UPDATE_VACATION_DATA
    ] }
  },
  {
    path: '',
    component: VacationListComponent,
    canActivate: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_VACATIONS
    ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule { }
