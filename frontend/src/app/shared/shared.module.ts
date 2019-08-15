import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';

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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    TemplateComponent,
    SortFieldDirective
  ]
})
export class SharedModule {
}
