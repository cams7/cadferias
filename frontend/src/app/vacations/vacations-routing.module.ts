import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: ':id/details',
    component: VacationDetailsComponent,
    resolve: { entity : VacationResolver }
  },
  {
    path: ':id',
    component: VacationFormComponent,
    resolve: { entity : VacationResolver },
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: '',
    component: VacationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationsRoutingModule { }
