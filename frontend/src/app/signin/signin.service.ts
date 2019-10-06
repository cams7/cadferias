import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { filter, take, flatMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { EventsService } from '../shared/events.service';
import { EventFrom, EventType } from '../shared/model/vo/event-vo';
import { BaseModalService } from '../shared/confirm-modal/base-modal-service';
import { SigninModalComponent } from './signin-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SigninService extends BaseModalService {

  constructor(
    private modalService: BsModalService,
    private eventsService: EventsService
  ) { 
    super();
  }

  showSignin$() {
    this.bsModalRef = this.modalService.show(SigninModalComponent);  
    return this.confirmResult$;
  }

  private get confirmResult$ () {
    return this.eventsService.events$.pipe(
      filter(event => event.from == EventFrom.SIGNIN_MODAL),
      flatMap(event => {
        if((event.type == EventType.MODAL_CLOSE || event.type == EventType.MODAL_CONFIRM_AND_CLOSE))  
          return of(event.type == EventType.MODAL_CONFIRM_AND_CLOSE);
          
        return EMPTY;
      }),
      take(1),
      tap(_ => {
        super.close();
      })
    );
  }
}
