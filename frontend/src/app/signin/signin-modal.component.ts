import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of, EMPTY } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { AppEventsService, AppEvent, AppEventFrom, AppEventType } from '../shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { AuthService } from '../shared/auth/auth.service';
import { BaseForm } from 'src/app/shared/common/base-form';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent extends BaseForm<User> {
   
  constructor(   
    private fb: FormBuilder,
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private authService: AuthService
  ) { 
    super(eventsService, confirmModalService);
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
      this.eventsService.resetAllSearchs();
      this.eventsService.addEvent(<AppEvent> {
        from: AppEventFrom.SIGNIN_MODAL, 
        type: AppEventType.MODAL_CONFIRM_AND_CLOSE
      });
    });

    return EMPTY;
  }
  
  onClose() {
    this.eventsService.addEvent(<AppEvent> {
      from: AppEventFrom.SIGNIN_MODAL, 
      type: AppEventType.MODAL_CLOSE
    });
  }

  protected getCreateSuccessMessage() {
    return undefined;
  }
  protected getUpdateSuccessMessage(id: number) {
    return undefined;
  }

}
