import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgSelectModule } from '@ng-select/ng-select';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';

import { NumericDirective } from './common/numeric-directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidAccessComponent } from './invalid-access/invalid-access.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SortFieldDirective } from './common/sort-field.directive';
import { FieldErrorDisplayComponent } from './common/field-error-display/field-error-display.component';
import { AuditableComponent } from './common/auditable/auditable.component';
import { SecurityItemComponent } from './security/security-item.component';
import { SecurityItemDirective } from './security/security-item.directive';
import { BackButtonComponent } from './common/back-button.component';

@NgModule({
  declarations: [
    NumericDirective,
    PageNotFoundComponent, 
    InvalidAccessComponent,
    ConfirmModalComponent,
    SortFieldDirective,
    FieldErrorDisplayComponent,    
    AuditableComponent, 
    SecurityItemComponent, 
    SecurityItemDirective, 
    BackButtonComponent
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
    BsDropdownModule.forRoot(),
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
    BsDropdownModule,
    NgSelectModule,
    TextMaskModule,
    NgBrazil,
    NumericDirective,
    SortFieldDirective,
    FieldErrorDisplayComponent,
    AuditableComponent,
    SecurityItemComponent, 
    SecurityItemDirective,
    BackButtonComponent    
  ]
})
export class SharedModule {
}
