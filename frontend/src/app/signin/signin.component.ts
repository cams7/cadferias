import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { BaseForm } from 'src/app/shared/common/base-form';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseForm implements OnInit, OnDestroy {  
  
  constructor(    
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]], 
      password: [undefined, Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

  ngOnDestroy() {
  }

  unchangedData(): Observable<boolean> {
    return of(true);
  }

  signIn() {
    this._submitted = true;

    if (this.form.invalid)
      return;

    console.log("user: ", this.form.value);
  } 

}
