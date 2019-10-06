import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ErrorsService } from 'src/app/shared/errors.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { BaseForm } from './../../shared/common/base-form';
import { StaffsService } from '../staffs.service';
import { Staff } from './../../shared/model/staff';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends BaseForm<Staff> {

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected eventsService: EventsService,
    protected errorsService: ErrorsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(route, eventsService, errorsService, confirmModalService);
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = this.fb.group({
      name: [this.entity.name]
    });
  }

  submit$() {
    const staff = <Staff>this.form.value;
    staff.id = this.entity.id;

    return this.staffsService.save$(staff).pipe(
      tap(staff => {
        if(this.isRegistred)
            this.eventsService.addSuccessAlert('Equipe atualizada!', `Os dados da equipe "${staff.name}" foram atualizados com sucesso.`);
        else
            this.eventsService.addSuccessAlert('Equipe cadastrada!', `A equipe "${staff.name}" foi cadastrada com sucesso.`);  
      })
    );
  }
}
