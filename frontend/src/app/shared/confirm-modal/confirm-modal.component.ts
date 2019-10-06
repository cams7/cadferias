import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../events.service';
import { EventVO, EventFrom, EventType } from '../model/vo/event-vo';

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
    private eventsService: EventsService
  ) { }

  ngOnInit() {
  }

  onConfirm() {
    this.eventsService.addEvent(<EventVO> {
      from: EventFrom.CONFIRM_MODAL, 
      type: EventType.MODAL_CONFIRM_AND_CLOSE
    });
  }

  onClose() {
    this.eventsService.addEvent(<EventVO> {
      from: EventFrom.CONFIRM_MODAL, 
      type: EventType.MODAL_CLOSE
    });
  }

}
