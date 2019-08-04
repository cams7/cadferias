import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    ConfirmModalComponent, 
    TemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    FormsModule,
    PaginationModule,
    TemplateComponent
  ]
})
export class SharedModule {
}
