import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninModalComponent } from './signin-modal.component';

@NgModule({
  declarations: [
    SigninModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SigninModalComponent
  ],
})
export class SigninModule { }
