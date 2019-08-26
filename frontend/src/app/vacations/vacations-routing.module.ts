import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDeactivateGuard } from '../shared/guards/form-deactivate.guard';
import { VacationResolverGuard } from './guards/vacation-resolver.guard';
import { VacationFormComponent } from './vacation-form/vacation-form.component';
import { VacationListComponent } from './vacation-list/vacation-list.component';

const routes: Routes = [
  {
    path: 'register',
    component: VacationFormComponent,
    resolve: { entity : VacationResolverGuard },
    canDeactivate: [FormDeactivateGuard]
  },
  {
    path: ':id',
    component: VacationFormComponent,
    resolve: { entity : VacationResolverGuard },
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
