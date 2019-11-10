import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { NgSelectModule } from '@ng-select/ng-select';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';

import { NumericDirective } from './common/numeric-directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SortFieldDirective } from './common/sort-field.directive';
import { FieldErrorDisplayComponent } from './common/field-error-display/field-error-display.component';
import { AuditableComponent } from './common/auditable/auditable.component';

@NgModule({
  declarations: [
    NumericDirective,
    PageNotFoundComponent, 
    ConfirmModalComponent,
    SortFieldDirective,
    FieldErrorDisplayComponent,    
    AuditableComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,    
    RouterModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    NgSelectModule,
    TextMaskModule,
    NgBrazil
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    BsDatepickerModule,
    ModalModule,
    AlertModule,
    TooltipModule,
    NgSelectModule,
    TextMaskModule,
    NgBrazil,
    NumericDirective,
    SortFieldDirective,
    FieldErrorDisplayComponent,
    AuditableComponent    
  ]
})
export class SharedModule {
}
