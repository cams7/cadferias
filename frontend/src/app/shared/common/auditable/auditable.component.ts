import { Component, OnInit, Input } from '@angular/core';
import { Auditable } from '../../model/auditable';

@Component({
  selector: 'auditable',
  templateUrl: './auditable.component.html',
  styleUrls: ['./auditable.component.scss']
})
export class AuditableComponent implements OnInit {

  @Input() entity: Auditable;

  constructor() { }

  ngOnInit() {
  }

}
