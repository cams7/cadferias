import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';
import { filter, take, flatMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppEventsService, AppEventFrom, AppEventType } from '../events.service';
import { BaseModalService } from './base-modal-service';
import { ConfirmModalComponent } from './confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService extends BaseModalService {

  constructor(
    private modalService: BsModalService,
    private eventsService: AppEventsService
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
      filter(event => event.from == AppEventFrom.CONFIRM_MODAL),
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
