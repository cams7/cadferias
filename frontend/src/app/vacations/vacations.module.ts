import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { VacationsRoutingModule } from './vacations-routing.module';
import { VacationListComponent } from './vacation-list/vacation-list.component';
import { VacationFormComponent } from './vacation-form/vacation-form.component';

@NgModule({
  declarations: [
    VacationListComponent, 
    VacationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VacationsRoutingModule
  ]
})
export class VacationsModule { }
