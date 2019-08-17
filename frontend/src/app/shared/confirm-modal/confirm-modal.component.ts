import { Component, OnInit, Input } from '@angular/core';
import { AppEventsService, AppEvent, AppEventFrom, AppEventType } from '../events.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  constructor(
    private eventsService: AppEventsService
  ) { }

  ngOnInit() {
  }

  onConfirm() {
    this.eventsService.addEvent(<AppEvent> {
      from: AppEventFrom.CONFIRM_MODAL, 
      type: AppEventType.MODAL_CONFIRM_AND_CLOSE
    });
  }

  onClose() {
    this.eventsService.addEvent(<AppEvent> {
      from: AppEventFrom.CONFIRM_MODAL, 
      type: AppEventType.MODAL_CLOSE
    });
  }

}
