import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, tap, flatMap } from 'rxjs/operators';

import { EventsService } from './../../shared/events.service';
import { ConfirmModalService } from './../../shared/confirm-modal/confirm-modal.service';
import { Direction } from 'src/app/shared/model/vo/pagination/sort-vo';
import { BaseList } from './../../shared/common/base-list';
import { StaffsService } from '../staffs.service';
import { Staff, STAFF_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL, STAFF_ENDPOINT_GET_BY_ID_REL, STAFF_ENDPOINT_DELETE_REL } from './../../shared/model/staff';
import { FilterType } from 'src/app/shared/model/vo/filter/auditable-filter-vo';
import { StaffFilterVO } from 'src/app/shared/model/vo/filter/staff-filter-vo';
import { LinkWithRel, getRelByLinks } from 'src/app/shared/model/base-entity';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent extends BaseList<Staff, StaffFilterVO> {
    
  constructor(
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventsService: EventsService,
    protected confirmModalService: ConfirmModalService,
    private staffsService: StaffsService
  ) { 
    super(renderer, route, router, fb, eventsService, confirmModalService, staffsService);
  }

  protected addFilter(staff: StaffFilterVO) {
    this.eventsService.addStaffFilter(staff);
  }  

  protected getFilterType() {
    return FilterType.STAFF;
  }

  protected getFilterBySearch(search: string): StaffFilterVO {
    const staff = <StaffFilterVO>{};
    staff.name = search;
    staff.emailOfCreatedBy = search;
    return staff;
  }

  protected getSearchByFilter(staff: StaffFilterVO): string {
    return staff.name;
  }

  protected setSortFields(sortFields: Map<string, Direction>) {
    sortFields.set('name', undefined);
  }

  protected delete$(staff: Staff): Observable<void> {
    return this.confirmModalService.showConfirm$('Confirmação', `Tem certeza que deseja remover a equipe "${staff.name}"?`).pipe(
      filter(confirmed => confirmed),
      flatMap(_ => this.staffsService.remove$(staff.entityId)), 
      tap(_ => this.eventsService.addSuccessAlert('Equipe excluída!', `A equipe "${staff.name}" foi excluida com sucesso.`))
    );
  }

  getWithAuditByIdRel(links: LinkWithRel[]) {
    return getRelByLinks(links, STAFF_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL);
  }

  getByIdRel(links: LinkWithRel[]) {
    return getRelByLinks(links, STAFF_ENDPOINT_GET_BY_ID_REL);
  }

  deleteRel(links: LinkWithRel[]) {
    return getRelByLinks(links, STAFF_ENDPOINT_DELETE_REL);
  }
}
