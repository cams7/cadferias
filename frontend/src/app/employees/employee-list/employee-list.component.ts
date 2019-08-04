import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

import { BaseList } from 'src/app/shared/common/base-list';
import { EmployeesService } from '../employees.service';
import { Employee } from './../../shared/model/employee';
import { finalize, switchMap, map, flatMap, filter } from 'rxjs/operators';
import { Page } from 'src/app/shared/common/base-service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends BaseList<Employee> implements OnInit, OnDestroy {  

  @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

  private _employees$: Observable<Employee[]>;
    
  constructor(
    protected renderer: Renderer2,
    protected router: Router,
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) { 
    super(renderer, router, employeesService);
  }

  ngOnInit() {
    this._employees$ = this.route.queryParams.pipe(
      filter(params => !!params['page'] || !!params['itemsPerPage']),
      flatMap(params => {
        const page = params['page'];
        const itemsPerPage = params['itemsPerPage'];

        if(!super.isNumberOrNull(page) || !super.isNumberOrNull(itemsPerPage))
          return EMPTY;
        
        if(page < 1 || itemsPerPage < 1)
          return EMPTY;       
          
        return of(<Page>{page: page, itemsPerPage: itemsPerPage});
      }),
      switchMap(page => {
        super.page = page;        
        return this.employeesService.getAll(page).pipe(
          map(pagination => {
            super._totalItems = pagination.totalItems;
            return pagination.items;
          })
        );
      })
    );
  }

  ngOnDestroy() {
  }

  get employees$() {
    return this._employees$;
  }

}
