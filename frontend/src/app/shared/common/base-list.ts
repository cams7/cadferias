import { OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, EMPTY, forkJoin, interval, combineLatest, timer, Observable, BehaviorSubject } from 'rxjs';
import { filter, delay, concatMap, flatMap, shareReplay, delayWhen, map, distinctUntilChanged, take, debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { AppEventsService, SearchType } from '../events.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { Base } from './base';
import { BaseService, Page, PageAndSort } from './base-service';
import { PageVO } from '../model/vo/pagination/page-vo';
import { SortVO, Direction } from '../model/vo/pagination/sort-vo';
import { BaseEntity } from '../model/base-entity';
import { AuditableFilterVO } from '../model/vo/filter/auditable-filter-vo';


const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const PAGE_PARAM = 'page';
const SORT_PARAM = 'sort';
const ORDER_PARAM = 'order';
const ITEMS_PER_PAGE_FIELD = 'itemsPerPage';
const SEARCH_FIELD = 'search';
export abstract class BaseList<E extends BaseEntity, F extends AuditableFilterVO> extends Base implements OnInit {
                          
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

    private pagination$: Observable<PageVO<E>>;
    private _currentItems$: Observable<PageVO<E>>;
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

    public form: FormGroup;

    private _sortField = <SortVO>{property: 'id', direction: Direction.DESC};
    private sortFields = new Map<string, Direction>();

    private deletedEntitySubject = new BehaviorSubject<number>(undefined);
    private deletedEntities = new Array<number>();
      
    constructor(
        protected renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected eventsService: AppEventsService,
        protected confirmModalService: ConfirmModalService,
        private service: BaseService<E, F>
    ) { 
        super();
    }

    ngOnInit() {     
        this.initSortFields();       
        
        this.form = this.fb.group({
            itemsPerPage: [],
            search: []
        });

        this.eventsService.getEntitySearch$(this.getSearchType()).pipe( 
            take(1),           
            filter(entitySearch => !!entitySearch)
        ).subscribe(entitySearch => {
            const search = this.getSearchByEntity(entitySearch);
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
                sort: this._sortField.property,
                order: this._sortField.direction
            };           
            this.router.navigate([], { relativeTo: this.route, queryParams: pageAndSort });
            this.isAfterChangeEvent = true;
        });

        this.form.get(SEARCH_FIELD).valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            takeUntil(super.end$)
        ).subscribe((search: string) => {
            const entitySearch = this.getEntityBySearch(search);
            this.addEntitySearch(entitySearch);         
        });

        this.pagination$ = combineLatest(
            this.eventsService.getEntitySearch$(this.getSearchType()),
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

                    if(order != Direction.ASC && order != Direction.DESC)
                        return EMPTY;
                    
                    return of(<PageAndSort>{
                        page: super.getNumber(page), 
                        itemsPerPage: super.getNumber(itemsPerPage),
                        sort: sort,
                        order: order
                    });
                })
            ),
            this.deletedEntitySubject.asObservable()
        ).pipe(
            switchMap(([entitySearch, pageAndSort, itemId]) => forkJoin(of(pageAndSort), this.getItems$(
                <number>super.getNumber(itemId), 
                pageAndSort, 
                entitySearch
            ))),
            flatMap(([pageAndSort, pagination])=> {
                this._totalItems = pagination.totalElements;
                this._totalItemsPerPage = pagination.content.length;                
                this.page = pageAndSort;
                
                const sortField = <SortVO> {
                    property: pageAndSort.sort,
                    direction: pageAndSort.order
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

        this.deletedEntitySubject.complete();
    }

    private getItems$(entityId: number, pageAndSort: PageAndSort, entitySearch: E) {
        if(!this._currentItems$ || !entityId || this.deletedEntities.some(id => id == entityId)) {
            this._currentItems$ = this.service.getBySearch$(pageAndSort, super.buildMap(entitySearch)).pipe(         
                shareReplay()
            );
        } else {            
            this._currentItems$.subscribe(pagination => {                
                this.deletedEntities.push(entityId);
                if(pagination.content.length == 1 && Number(this.page.page) < Number(this.numPages)) {
                    this._currentItems$ = this.service.getBySearch$(pageAndSort, super.buildMap(entitySearch)).pipe(         
                        shareReplay()
                    );    
                } else {
                    pagination.content = pagination.content.filter(item => Number(item.id) != Number(entityId));
                    pagination.totalElements = Number(pagination.totalElements) - 1;                   
                }
            });
        }
        return this._currentItems$;
    }

    protected abstract addEntitySearch(entitySearch: E): void;
    protected abstract getSearchType(): SearchType;
    protected abstract getEntityBySearch(search: string): E;
    protected abstract getSearchByEntity(entitySearch: E): string;
    protected abstract setSortFields(sortFields: Map<string, Direction>): void;

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(page: Page) {
        if(this.isPageChange(page)) {
            const pageAndSort = <PageAndSort>{
                page: page.page, 
                itemsPerPage: page.itemsPerPage,
                sort: this._sortField.property,
                order: this._sortField.direction
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

    private isSortFiedChange(sortField: SortVO) {
        return this._sortField.property != sortField.property || this._sortField.direction != sortField.direction;
    }

    get items$() {
        return this.pagination$.pipe(
            map(pagination => {        
              return pagination.content;
            })
        );
    }

    get totalItems$() {
        return this.pagination$.pipe(
            map(pagination => {        
              return pagination.totalElements;
            })
        );    
    }

    get isLoadedItems$() {
        return this.pagination$.pipe(
          map(pagination => {
            return pagination.totalElements > 0 && pagination.content.length > 0;
          })
        );
    }

    get allItemsPerPage() {
        return [5, 10, 25, 50, 100];
    }

    private initSortFields() {
        this.sortFields.set(this._sortField.property, this._sortField.direction);
        this.setSortFields(this.sortFields);
    }

    getSortField(fieldName: string) {
        const sortField = <SortVO>{
            property: fieldName, 
            direction: this.sortFields.get(fieldName)
        };  
        return sortField;
    }

    set sortFieldChanged(sortField: SortVO) {
        if(this.isSortFiedChange(sortField)) {
            const pageAndSort = <PageAndSort>{
                page: this._page.page, 
                itemsPerPage: this._page.itemsPerPage,
                sort: sortField.property,
                order: sortField.direction
            };   
            this.router.navigate([], { relativeTo: this.route, queryParams: pageAndSort });
        }    
    }

    private set sortField(sortField: SortVO) {
        if(this.isSortFiedChange(sortField)) {
            Array.from(this.sortFields.keys()).filter(fieldName => fieldName != sortField.property).forEach(fieldName => 
                this.sortFields.set(fieldName, undefined)
            );
            this.sortFields.set(sortField.property, sortField.direction);
            this._sortField = sortField;
        }
    }

    onEdit(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    onDelete(entity: E) {
        this.delete$(entity).subscribe(_ => {    
            this.deletedEntitySubject.next(entity.id);                                
        });
    }

    protected abstract delete$(entity: E): Observable<void>;
}