import { OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, EMPTY, forkJoin, interval, combineLatest, timer, Observable } from 'rxjs';
import { filter, delay, concatMap, flatMap, shareReplay, delayWhen, map, distinctUntilChanged, take, debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { EventsService, SearchType } from '../events.service';
import { Base } from './base';
import { BaseService, Page } from './base-service';
import { PaginationVO } from './../model/vo/pagination-vo';

const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const PAGE_PARAM = 'page';
const ITEMS_PER_PAGE_FIELD = 'itemsPerPage';
const SEARCH_FIELD = 'search';
export abstract class BaseList<T> extends Base implements OnInit {
                          
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
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

    public form: FormGroup;
  
    constructor(
        protected renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected eventsService: EventsService,
        private service: BaseService<T>
    ) { 
        super();
    }

    ngOnInit() {
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
            const page = <Page>{page: this._page.page, itemsPerPage: itemsPerPage};           
            this.router.navigate([this.service.shortApiUrl], { queryParams: page });
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
                filter(params => !!params[PAGE_PARAM] || !!params[ITEMS_PER_PAGE_PARAM]),
                flatMap(params => { 
                    const page = params[PAGE_PARAM];
                    const itemsPerPage = params[ITEMS_PER_PAGE_PARAM];
                            
                    if(!super.isNumberOrNull(page) || !super.isNumberOrNull(itemsPerPage))
                        return EMPTY;
                    
                    if(page < 1 || itemsPerPage < 1)
                        return EMPTY; 
                    
                    return of(<Page>{
                        page: super.getNumber(page), 
                        itemsPerPage: super.getNumber(itemsPerPage)
                    });
                })
            )
        ).pipe(
            switchMap(([modelSearch, page]) => forkJoin(of(page), this.service.getAll$(page, super.buildMap(modelSearch)))),
            flatMap(([page, pagination])=> {
                this._totalItems = pagination.totalItems;
                this._totalItemsPerPage = pagination.items.length;                
                this.page = page;                
                return of(pagination);
            }),
            takeUntil(super.end$),
            shareReplay()
        );
    }  
        
    protected abstract addModelSearch(modelSearch: T): void;
    protected abstract getSearchType(): SearchType;
    protected abstract getModelBySearch(search: string): T;
    protected abstract getSearchByModel(modelSearch: T): string;

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(pageChanged: Page) {
        if(this.isPageChange(pageChanged)) {   
            this.router.navigate([this.service.shortApiUrl], { queryParams: pageChanged });
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
        return this.isAfterChangeEvent || this._page.page != page.page || this.page.itemsPerPage != page.itemsPerPage;
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

}