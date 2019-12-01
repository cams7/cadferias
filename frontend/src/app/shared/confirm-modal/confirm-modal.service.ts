import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { filter, take, flatMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { EventsService } from '../events.service';
import { EventFrom, EventType } from '../model/vo/event-vo';
import { BaseModalService } from './base-modal-service';
import { ConfirmModalComponent } from './confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService extends BaseModalService {

  constructor(
    private modalService: BsModalService,
    private eventsService: EventsService
  ) { 
    super();
  }

  showConfirm$(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.msg = msg;

    if (okTxt) 
      this.bsModalRef.content.okTxt = okTxt;
    
    if (cancelTxt) 
      this.bsModalRef.content.cancelTxt = cancelTxt;
    
    return this.confirmResult$;
  }

  private get confirmResult$ () {
    return this.eventsService.events$.pipe(
      filter(event => event.from == EventFrom.CONFIRM_MODAL),
      flatMap(event => {
        if((event.type == EventType.MODAL_CLOSE || event.type == EventType.MODAL_CONFIRM_AND_CLOSE))  
          return of(event.type == EventType.MODAL_CONFIRM_AND_CLOSE);
          
        return EMPTY;
      }),
      take(1),
      tap(_ => {
        this.close();
      })
    );
  }
}
