import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ErrorsService } from 'src/app/shared/errors.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { BaseForm } from './../../shared/common/base-form';
import { StaffsService } from '../staffs.service';
import { Staff, STAFF_ENDPOINT_GET_BY_SEARCH_REL, STAFF_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL, STAFF_ENDPOINT_UPDATE_REL } from './../../shared/model/staff';
import { getRel } from 'src/app/shared/model/base-entity';
import { HistoryService } from 'src/app/shared/history.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm<Staff> {

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected historyService: HistoryService,
    private eventsService: EventsService,
    protected errorsService: ErrorsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(route, router, historyService, errorsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      name: [this.entity.name]
    });
  }

  submit$() {
    const staff = <Staff>this.form.value;
    staff.entityId = this.entity.entityId;

    return this.staffsService.save$(staff).pipe(
      tap(staff => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Equipe atualizada!', `Os dados da equipe "${staff.name}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Equipe cadastrada!', `A equipe "${staff.name}" foi cadastrada com sucesso.`);  
      })
    );
  }

  get getBySearchRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_GET_BY_SEARCH_REL);
  }

  get getWithAuditByIdRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL);
  }

  get updateRel() {
    return getRel(super.entity._links, STAFF_ENDPOINT_UPDATE_REL);
  }

  get submitTooltip() {
    if(!super.entity._links)
      return "Salvar os dados da equipe";
    return this.updateRel.title;
  }
}
