import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    TemplateComponent
  ]
})
export class SharedModule {
}
