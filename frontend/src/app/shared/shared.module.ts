import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TemplateComponent } from './template/template.component';
import { SortFieldDirective } from './common/sort-field.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    ConfirmModalComponent, 
    TemplateComponent, 
    SortFieldDirective
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,    
    RouterModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    BsDatepickerModule,
    TemplateComponent,
    SortFieldDirective
  ]
})
export class SharedModule {
}
