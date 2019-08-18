import { OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, EMPTY, forkJoin, interval, combineLatest, timer, Observable, BehaviorSubject } from 'rxjs';
import { filter, delay, concatMap, flatMap, shareReplay, delayWhen, map, distinctUntilChanged, take, debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { AppEventsService, SearchType } from '../events.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { Base } from './base';
import { BaseService, Page, PageAndSort } from './base-service';
import { PaginationVO } from './../model/vo/pagination-vo';
import { SortField, SortOrder } from './sort-field.directive';
import { BaseModel } from '../model/base-model';

const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const PAGE_PARAM = 'page';
const SORT_PARAM = 'sort';
const ORDER_PARAM = 'order';
const ITEMS_PER_PAGE_FIELD = 'itemsPerPage';
const SEARCH_FIELD = 'search';
export abstract class BaseList<T extends BaseModel> extends Base implements OnInit {
                          
    readonly previousText = '&lsaquo;';
    readonly nextText = '&rsaquo;'; 
    readonly firstText = '&laquo;'; 
    readonly lastText = '&raquo;';
    
    readonly showDirectionLinks = true;
    readonly showBoundaryLinks = true;
    readonly maxSize = 5;
    readonly rotate = true;

    numPages: number;

    private _totalItems: number;
    private _totalItemsPerPage: number;
    private _page = <Page>{};
    private isAfterChangeEvent = false;

    private pagination$: Observable<PaginationVO<T>>;
    private _items$: Observable<PaginationVO<T>>;
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

    public form: FormGroup;

    private _sortField = <SortField>{fieldName: 'id', order: SortOrder.DESC};
    private sortFields = new Map<string, SortOrder>();

    private itemDeletedSubject = new BehaviorSubject<number>(undefined);
    private itemsDeleted = new Array<number>();
      
    constructor(
        protected renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected eventsService: AppEventsService,
        protected confirmModalService: ConfirmModalService,
        private service: BaseService<T>
    ) { 
        super();
    }

    ngOnInit() {     
        this.initSortFields();       
        
        this.form = this.fb.group({
            itemsPerPage: [],
            search: []
        });

        this.eventsService.getModelSearch$(this.getSearchType()).pipe( 
            take(1),           
            filter(modelSearch => !!modelSearch)
        ).subscribe(modelSearch => {
            const search = this.getSearchByModel(modelSearch);
            this.form.get(SEARCH_FIELD).setValue(search);    
        });

        this.form.get(ITEMS_PER_PAGE_FIELD).valueChanges.pipe(
            filter(itemsPerPage => !!itemsPerPage),
            map(itemsPerPage => this.getNumber(itemsPerPage)),
            distinctUntilChanged(),
            filter(itemsPerPage => this._page.itemsPerPage && itemsPerPage != this._page.itemsPerPage),
            takeUntil(super.end$)
        ).subscribe(itemsPerPage => {
            const pageAndSort = <PageAndSort>{
                page: this._page.page, 
                itemsPerPage: itemsPerPage,
                sort: this._sortField.fieldName,
                order: this._sortField.order
            };           
            this.router.navigate([], { relativeTo: this.route, queryParams: pageAndSort });
            this.isAfterChangeEvent = true;
        });

        this.form.get(SEARCH_FIELD).valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            takeUntil(super.end$)
        ).subscribe((search: string) => {
            const modelSearch = this.getModelBySearch(search);
            this.addModelSearch(modelSearch);         
        });

        this.pagination$ = combineLatest(
            this.eventsService.getModelSearch$(this.getSearchType()),
            this.route.queryParams.pipe(
                filter(params => params[PAGE_PARAM] && params[SORT_PARAM] && params[ORDER_PARAM]),
                flatMap(params => { 
                    const page = params[PAGE_PARAM];
                    const itemsPerPage = params[ITEMS_PER_PAGE_PARAM];
                    const sort = params[SORT_PARAM];
                    const order = params[ORDER_PARAM];
                            
                    if(!super.isNumber(page) || !super.isNumberOrNull(itemsPerPage))
                        return EMPTY;
                    
                    if(page < 1 || itemsPerPage < 1)
                        return EMPTY;
                    
                    if(!Array.from(this.sortFields.keys()).some(fieldName => fieldName == sort)) 
                        return EMPTY;

                    if(order != SortOrder.ASC && order != SortOrder.DESC)
                        return EMPTY;
                    
                    return of(<PageAndSort>{
                        page: super.getNumber(page), 
                        itemsPerPage: super.getNumber(itemsPerPage),
                        sort: sort,
                        order: order
                    });
                })
            ),
            this.itemDeletedSubject.asObservable()
        ).pipe(
            switchMap(([modelSearch, pageAndSort, itemId]) => forkJoin(of(pageAndSort), this.getItems$(
                <number>super.getNumber(itemId), 
                pageAndSort, 
                modelSearch
            ))),
            flatMap(([pageAndSort, pagination])=> {
                this._totalItems = pagination.totalItems;
                this._totalItemsPerPage = pagination.items.length;                
                this.page = pageAndSort;
                
                const sortField = <SortField> {
                    fieldName: pageAndSort.sort,
                    order: pageAndSort.order
                }
                this.sortField = sortField;
                return of(pagination);
            }),
            takeUntil(super.end$),
            shareReplay()
        );
    }  
        
    ngOnDestroy() {
        super.ngOnDestroy();

        this.itemDeletedSubject.complete();
    }

    private getItems$(itemId: number, pageAndSort: PageAndSort, modelSearch: T) {
        if(!this._items$ || !itemId || this.itemsDeleted.some(id => id == itemId)) {
            this._items$ = this.service.getAll$(pageAndSort, super.buildMap(modelSearch)).pipe(         
                shareReplay()
            );
        } else {            
            this._items$.subscribe(pagination => {                
                this.itemsDeleted.push(itemId);
                if(pagination.items.length == 1 && Number(this.page.page) < Number(this.numPages)) {
                    this._items$ = this.service.getAll$(pageAndSort, super.buildMap(modelSearch)).pipe(         
                        shareReplay()
                    );    
                } else {
                    pagination.items = pagination.items.filter(item => Number(item.id) != Number(itemId));
                    pagination.totalItems = Number(pagination.totalItems) - 1;                   
                }
            });
        }
        return this._items$;
    }

    protected abstract addModelSearch(modelSearch: T): void;
    protected abstract getSearchType(): SearchType;
    protected abstract getModelBySearch(search: string): T;
    protected abstract getSearchByModel(modelSearch: T): string;
    protected abstract setSortFields(sortFields: Map<string, SortOrder>): void;

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(page: Page) {
        if(this.isPageChange(page)) {
            const pageAndSort = <PageAndSort>{
                page: page.page, 
                itemsPerPage: page.itemsPerPage,
                sort: this._sortField.fieldName,
                order: this._sortField.order
            };   
            this.router.navigate([], { relativeTo: this.route, queryParams: pageAndSort });
            this.isAfterChangeEvent = true;
        }
    }

    get page() {
        return this._page;
    }
    
    set page(page: Page) {
        const MILLIS_VALUE = 50;
        const PAGELINK_CLASS = 'li.pagination-page>a.page-link';

        this.isAfterChangeEvent = false;
        this._page.itemsPerPage = page.itemsPerPage;

        if(this.allItemsPerPage.some(value => value == page.itemsPerPage))
            this.form.get(ITEMS_PER_PAGE_FIELD).setValue(page.itemsPerPage);
        else
            this.form.get(ITEMS_PER_PAGE_FIELD).setValue(undefined);   
      
        if(this.isChangeOfPaginationStyle(page)) {
            combineLatest(
                of(page),
                interval(MILLIS_VALUE).pipe(
                    filter(_ => {
                        const nodes: NodeList = this.pagination.nativeElement.querySelectorAll(PAGELINK_CLASS);
                        return nodes.length > 1;
                    }),
                    take(1)
                )
            ).pipe(
                concatMap(([page, _]) => {
                    this._page.page = page.page;
                    return of(page).pipe(
                        delay(MILLIS_VALUE)
                    )
                })
            ).subscribe(page => {
                const ACTIVE_CLASS = 'active';
                const nodes: NodeList = this.pagination.nativeElement.querySelectorAll(PAGELINK_CLASS);
                for(let i = 0; i < nodes.length; i++) {
                    const paginationPage: Node = nodes.item(i).parentElement;
                    if((<any>paginationPage).classList.contains(ACTIVE_CLASS)) {
                        this.renderer.removeClass(paginationPage, ACTIVE_CLASS);
                        break;
                    }
                }
                for(let i = 0; i < nodes.length; i++) {
                    const pageLink: Node = nodes.item(i);
                    const paginationPage: Node = pageLink.parentElement;                    
                    if(this.getNumber(pageLink.textContent.trim()) == page.page) {   
                        this.renderer.addClass(paginationPage, ACTIVE_CLASS);
                        break;
                    }
                }
            });            
        } else {
            of(page).pipe(
                delayWhen(_ => timer(MILLIS_VALUE))
            ).subscribe(page =>{
                this._page.page = page.page;           
            });            
        }  
    }

    private isChangeOfPaginationStyle(page: Page) {
        return this._totalItemsPerPage > 0 && this.isMultiplePages(page) &&  this.isPageChange(page);
    }

    private isMultiplePages(page: Page) {        
        return this._totalItems > page.itemsPerPage;
    }

    private isPageChange(page: Page) {
        return this.isAfterChangeEvent || this._page.page != page.page || this._page.itemsPerPage != page.itemsPerPage;
    }

    private isSortFiedChange(sortField: SortField) {
        return this._sortField.fieldName != sortField.fieldName || this._sortField.order != sortField.order;
    }

    get items$() {
        return this.pagination$.pipe(
            map(pagination => {        
              return pagination.items;
            })
        );
    }

    get totalItems$() {
        return this.pagination$.pipe(
            map(pagination => {        
              return pagination.totalItems;
            })
        );    
    }

    get isLoadedItems$() {
        return this.pagination$.pipe(
          map(pagination => {
            return pagination.totalItems > 0 && pagination.items.length > 0;
          })
        );
    }

    get allItemsPerPage() {
        return [5, 10, 25, 50, 100];
    }

    private initSortFields() {
        this.sortFields.set(this._sortField.fieldName, this._sortField.order);
        this.setSortFields(this.sortFields);
    }

    getSortField(fieldName: string) {
        const sortField = <SortField>{
            fieldName: fieldName, 
            order: this.sortFields.get(fieldName)
        };  
        return sortField;
    }

    set sortFieldChanged(sortField: SortField) {
        if(this.isSortFiedChange(sortField)) {
            const pageAndSort = <PageAndSort>{
                page: this._page.page, 
                itemsPerPage: this._page.itemsPerPage,
                sort: sortField.fieldName,
                order: sortField.order
            };   
            this.router.navigate([], { relativeTo: this.route, queryParams: pageAndSort });
        }    
    }

    private set sortField(sortField: SortField) {
        if(this.isSortFiedChange(sortField)) {
            Array.from(this.sortFields.keys()).filter(fieldName => fieldName != sortField.fieldName).forEach(fieldName => 
                this.sortFields.set(fieldName, undefined)
            );
            this.sortFields.set(sortField.fieldName, sortField.order);
            this._sortField = sortField;
        }
    }

    onEdit(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    onDelete(id: number) {
        this.confirmModalService.showConfirm$('Confirmação', this.getDeleteConfirmationMessage(id)).pipe(
            filter(confirmed => confirmed),            
            switchMap(_ => this.service.remove$(id))
        ).subscribe(_ => {    
            this.itemDeletedSubject.next(id);
            this.eventsService.addSuccessAlert('Item excluído!', this.getDeleteSuccessMessage(id));                                 
        });
    }

    protected abstract getDeleteConfirmationMessage(id: number): string;
    protected abstract getDeleteSuccessMessage(id: number): string;

}