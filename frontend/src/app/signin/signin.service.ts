import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { filter, take, flatMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppEventsService, AppEventFrom, AppEventType } from '../shared/events.service';
import { BaseModalService } from '../shared/confirm-modal/base-modal-service';

import { SigninModalComponent } from './signin-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SigninService extends BaseModalService {

  constructor(
    private modalService: BsModalService,
    private eventsService: AppEventsService
  ) { 
    super();
  }

  showSignin$() {
    this.bsModalRef = this.modalService.show(SigninModalComponent);  
    return this.confirmResult$;
  }

  private get confirmResult$ () {
    return this.eventsService.events$.pipe(
      filter(event => event.from == AppEventFrom.SIGNIN_MODAL),
      flatMap(event => {
        if((event.type == AppEventType.MODAL_CLOSE || event.type == AppEventType.MODAL_CONFIRM_AND_CLOSE))  
          return of(event.type == AppEventType.MODAL_CONFIRM_AND_CLOSE);
          
        return EMPTY;
      }),
      take(1),
      tap(_ => {
        super.close();
      })
    );
  }
}
