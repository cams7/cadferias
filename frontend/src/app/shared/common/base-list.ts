import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, EMPTY, forkJoin, interval, combineLatest, timer, Observable, BehaviorSubject } from 'rxjs';
import { filter, delay, concatMap, flatMap, shareReplay, delayWhen, map, distinctUntilChanged, take, debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { EventsService } from '../events.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { ComponentBase } from './component-base';
import { BaseService } from './base-service';
import { PageVO } from '../model/vo/pagination/page-vo';
import { SortVO, Direction } from '../model/vo/pagination/sort-vo';
import { BaseEntity, LinkWithRel, Link } from '../model/base-entity';
import { AuditableFilterVO, FilterType } from '../model/vo/filter/auditable-filter-vo';
import { SearchVO } from './../model/vo/search-vo';
import { PageInputVO } from './../model/vo/pagination/page-input-vo';
import { PageParamsVO, PageAndSortParamsVO } from '../model/vo/page-params-vo';

const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const PAGE_PARAM = 'page';
const SORT_PARAM = 'sort';
const ORDER_PARAM = 'order';
const ITEMS_PER_PAGE_FIELD = 'itemsPerPage';
const SEARCH_FIELD = 'search';
export abstract class BaseList<E extends BaseEntity, F extends AuditableFilterVO> extends ComponentBase {
                          
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
    private _page = <PageParamsVO>{};
    private isAfterChangeEvent = false;

    private pagination$: Observable<PageVO<E>>;
    private _currentItems$: Observable<PageVO<E>>;
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

    public form: FormGroup;

    private _sortField = <SortVO>{property: 'entityId', direction: Direction.DESC};
    private sortFields = new Map<string, Direction>();

    private deletedEntitySubject = new BehaviorSubject<number>(undefined);
    private deletedEntities = new Array<number>();
      
    constructor(
        protected renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected eventsService: EventsService,
        protected confirmModalService: ConfirmModalService,
        private service: BaseService<E, F>
    ) { 
        super(router);
    }

    ngOnInit() {   
        super.ngOnInit();    
        
        this.initSortFields();       
        
        this.form = this.fb.group({
            itemsPerPage: [],
            search: []
        });

        this.eventsService.getFilter$(this.getFilterType()).pipe( 
            take(1),           
            filter(filter => !!filter)
        ).subscribe(filter => {
            const search = this.getSearchByFilter(filter);
            this.form.get(SEARCH_FIELD).setValue(search);    
        });

        this.form.get(ITEMS_PER_PAGE_FIELD).valueChanges.pipe(
            filter(itemsPerPage => !!itemsPerPage),
            map(itemsPerPage => this.getNumber(itemsPerPage)),
            distinctUntilChanged(),
            filter(itemsPerPage => this._page.itemsPerPage && itemsPerPage != this._page.itemsPerPage),
            takeUntil(this.end$)
        ).subscribe(itemsPerPage => {
            const pageAndSort = <PageAndSortParamsVO>{
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
            takeUntil(this.end$)
        ).subscribe((search: string) => {
            const filter = this.getFilterBySearch(search);
            this.addFilter(filter);         
        });

        this.pagination$ = combineLatest(
            this.eventsService.getFilter$(this.getFilterType()),
            this.route.queryParams.pipe(
                filter(params => params[PAGE_PARAM] && params[SORT_PARAM] && params[ORDER_PARAM]),
                flatMap(params => { 
                    const page = params[PAGE_PARAM];
                    const itemsPerPage = params[ITEMS_PER_PAGE_PARAM];
                    const sort = params[SORT_PARAM];
                    const order = params[ORDER_PARAM];
                            
                    if(!this.isNumber(page) || !this.isNumberOrNull(itemsPerPage))
                        return EMPTY;
                    
                    if(page < 1 || itemsPerPage < 1)
                        return EMPTY;
                    
                    if(!Array.from(this.sortFields.keys()).some(fieldName => fieldName == sort)) 
                        return EMPTY;

                    if(order != Direction.ASC && order != Direction.DESC)
                        return EMPTY;
                    
                    return of(<PageAndSortParamsVO>{
                        page: this.getNumber(page), 
                        itemsPerPage: this.getNumber(itemsPerPage),
                        sort: sort,
                        order: order
                    });
                })
            ).pipe(
                shareReplay()
            ),
            this.deletedEntitySubject.asObservable()
        ).pipe(
            switchMap(([filter, pageAndSort, itemId]) => forkJoin(of(pageAndSort), this.getItems$(
                <number>this.getNumber(itemId), 
                pageAndSort, 
                filter
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
            takeUntil(this.end$),
            shareReplay()
        );
    }  
        
    ngOnDestroy() {
        super.ngOnDestroy();

        this.deletedEntitySubject.complete();
    }

    private getItems$(id: number, pageAndSort: PageAndSortParamsVO, filter: F) {
        if(!this._currentItems$ || !id || this.deletedEntities.some(entityId => entityId == id)) {  
            this._currentItems$ = this.service.getBySearch$(this.getSearch(pageAndSort, filter)).pipe(         
                shareReplay()
            );
        } else {            
            this._currentItems$.subscribe(pagination => {                
                this.deletedEntities.push(id);
                if(pagination.content.length == 1 && Number(this.page.page) < Number(this.numPages)) {
                    this._currentItems$ = this.service.getBySearch$(this.getSearch(pageAndSort, filter)).pipe(     
                        shareReplay()
                    );    
                } else {
                    pagination.content = pagination.content.filter(item => Number(item.entityId) != Number(id));
                    pagination.totalElements = Number(pagination.totalElements) - 1;                   
                }
            });
        }
        return this._currentItems$;
    }

    private getSearch(pageAndSort: PageAndSortParamsVO, filter: F) {
        const search = <SearchVO<F>>{};
        search.globalFilter = true;
        search.searchFilter = filter;
        search.pageInput = <PageInputVO>{};
        search.pageInput.pageNumber = pageAndSort.page - 1;
        search.pageInput.size = pageAndSort.itemsPerPage;
        search.pageInput.changedQuery = true;
        search.pageInput.totalElements = 0;
        const sort = <SortVO>{};
        sort.property = pageAndSort.sort;
        sort.direction = pageAndSort.order;
        search.pageInput.sort = [sort];
        return search;
    }

    protected abstract addFilter(filter: F): void;
    protected abstract getFilterType(): FilterType;
    protected abstract getFilterBySearch(search: string): F;
    protected abstract getSearchByFilter(filter: F): string;
    protected abstract setSortFields(sortFields: Map<string, Direction>): void;

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(page: PageParamsVO) {
        if(this.isPageChange(page)) {
            const pageAndSort = <PageAndSortParamsVO>{
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
    
    set page(page: PageParamsVO) {
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

    private isChangeOfPaginationStyle(page: PageParamsVO) {
        return this._totalItemsPerPage > 0 && this.isMultiplePages(page) &&  this.isPageChange(page);
    }

    private isMultiplePages(page: PageParamsVO) {        
        return this._totalItems > page.itemsPerPage;
    }

    private isPageChange(page: PageParamsVO) {
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
            const pageAndSort = <PageAndSortParamsVO>{
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

    onDetails(id: number) {
        this.router.navigate([id, 'details'], { relativeTo: this.route });
    }

    onEdit(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    onDelete(entity: E) {
        this.delete$(entity).subscribe(_ => {    
            this.deletedEntitySubject.next(entity.entityId);                                
        });
    }

    protected abstract delete$(entity: E): Observable<void>;

    abstract getWithAuditByIdRel(links: LinkWithRel[]): Link;
    abstract getByIdRel(links: LinkWithRel[]): Link;
    abstract deleteRel(links: LinkWithRel[]): Link;
}