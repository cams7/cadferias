import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { EventsService } from '../shared/events.service';
import { AuthService } from '../shared/auth/auth.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { User } from './../shared/model/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseForm {
   
  constructor(
    private router: Router,    
    private fb: FormBuilder,
    private eventsService: EventsService,
    private authService: AuthService
  ) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]], 
      password: [undefined, Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

  submit() {
    const user = <User>this.form.value;

    this.authService.signIn$(user).pipe(
      take(1)
    ).subscribe(
      user => console.log(`O usuário "${user.email}" foi autenticado com sucesso!!!`)
    );

    this.authService.loggedIn$.pipe(
      filter(loggedIn => loggedIn),
      take(1)
    ).subscribe(_ => {
      this.router.navigate(['/home']);
      this.eventsService.resetAllSearchs();
    });
  }  

}
