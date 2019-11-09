import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { EventsService } from '../shared/events.service';
import { ErrorsService } from '../shared/errors.service';
import { EventVO, EventFrom, EventType } from '../shared/model/vo/event-vo';
import { ConfirmModalService } from './../shared/confirm-modal/confirm-modal.service';
import { AuthService } from '../shared/auth/auth.service';
import { BaseForm } from './../shared/common/base-form';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent extends BaseForm<User> {
   
  constructor(   
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    private eventsService: EventsService,
    protected errorsService: ErrorsService,
    protected confirmModalService: ConfirmModalService,
    private authService: AuthService
  ) { 
    super(route, router, errorsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]], 
      password: [undefined, Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

  unchangedData$() {
    return of(true);
  }

  submit$() {
    if(this.form.status == 'VALID') {       
      const user = <User>this.form.value;
      user['rememberMe'] = undefined;

      this.authService.signIn$(user).pipe(
        take(1)
      ).subscribe(
        user => console.log(`O usuário "${user.email}" foi autenticado com sucesso!!!`)
      );

      this.authService.loggedIn$.pipe(
        filter(loggedIn => loggedIn),
        take(1)
      ).subscribe(_ => {
        this.eventsService.resetAllSearchs();
        this.eventsService.addEvent(<EventVO> {
          from: EventFrom.SIGNIN_MODAL, 
          type: EventType.MODAL_CONFIRM_AND_CLOSE
        });
      });
    }

    return EMPTY;
  }
  
  onClose() {
    this.eventsService.addEvent(<EventVO> {
      from: EventFrom.SIGNIN_MODAL, 
      type: EventType.MODAL_CLOSE
    });
  }

}
