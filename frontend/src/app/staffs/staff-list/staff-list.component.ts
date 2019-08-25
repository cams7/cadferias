import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AppEventsService, SearchType } from 'src/app/shared/events.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal/confirm-modal.service';
import { SortOrder } from 'src/app/shared/common/sort-field.directive';
import { BaseList } from 'src/app/shared/common/base-list';
import { StaffsService } from '../staffs.service';
import { Staff } from './../../shared/model/staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent extends BaseList<Staff> {
    
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: AppEventsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, staffsService);
  }

  protected addEntitySearch(staff: Staff) {
    this.eventsService.addStaffSearch(staff);
  }  

  protected getSearchType() {
    return SearchType.STAFF;
  }

  protected getEntityBySearch(search: string): Staff {
    const staff = <Staff>{};
    staff.name = search;
    return staff;
  }

  protected getSearchByEntity(staff: Staff): string {
    return super.buildMap(staff).get('name');
  }

  protected setSortFields(sortFields: Map<string, SortOrder>) {
    sortFields.set('name', undefined);
  }

  protected delete$(staff: Staff): Observable<void> {
    return this.confirmModalService.showConfirm$('Confirmação', `Tem certeza que deseja remover a equipe "${staff.name}"?`).pipe(
      filter(confirmed => confirmed),            
      switchMap(_ => this.staffsService.remove$(staff.id)),
      tap(_ => this.eventsService.addSuccessAlert('Equipe excluída!', `A equipe "${staff.name}" foi excluida com sucesso.`))
    );
  }
}
