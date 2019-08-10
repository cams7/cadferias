import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, EMPTY, forkJoin, interval, combineLatest, timer, Observable } from 'rxjs';
import { filter, delay, concatMap, flatMap, shareReplay,takeWhile, last, delayWhen, map } from 'rxjs/operators';

import { Base } from './base';
import { BaseService, Page } from './base-service';
import { PaginationVO } from './../model/vo/pagination-vo';

export abstract class BaseList<T> extends Base {    
               
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

    private _pagination$: Observable<PaginationVO<T>>;
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;
 
    constructor(
        protected renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        private service: BaseService<T>
    ) { 
        super();
    }

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(pageChanged: Page) {
        if(this.isPageChanged(pageChanged)) {
            this._page = pageChanged;
            this.router.navigate([this.service.shortApiUrl], { queryParams: pageChanged });
        }
    }

    get page() {
        return this._page;
    }
    
    set page(page: Page) {
        this._page.itemsPerPage = page.itemsPerPage;

        const MILLIS_VALUE = 50;
        const PAGELINK_CLASS = 'li.pagination-page>a.page-link';

        if(this._totalItemsPerPage > 0 && this.isMultiplePages(page) &&  this.isPageChanged(page)) {
            combineLatest(
                of(page),
                interval(MILLIS_VALUE).pipe(
                    takeWhile(i => {
                        const nodes: NodeList = this.pagination.nativeElement.querySelectorAll(PAGELINK_CLASS);
                        return i < 1 && nodes.length > 1;
                    }),
                    last()
                )
            ).pipe(
                concatMap(([page, _]) => {
                    this._page.page = page.page;
                    return of(page).pipe(
                        delay(MILLIS_VALUE)
                    )
                })  
            ).subscribe(page => {
                this._page.page = page.page;
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
                filter(page => this.isPageChanged(page)),
                delayWhen(_ => timer(MILLIS_VALUE))
            ).subscribe(page =>{
                this._page.page = page.page;                
            });            
        }  
    }

    private isMultiplePages(page: Page) {        
        let multiplePages =  this._totalItems > page.itemsPerPage;
        return multiplePages;
    }

    private isPageChanged(page: Page) {
        const pageChanged = this._page.page != page.page || this.page.itemsPerPage != page.itemsPerPage;
        return pageChanged;
    }

    private get pagination$() {
        if(!this._pagination$) {
            this._pagination$ = this.route.queryParams.pipe(
                filter(params => !!params['page'] || !!params['itemsPerPage']),
                flatMap(params => {
                const page = params['page'];
                const itemsPerPage = params['itemsPerPage'];
        
                if(!super.isNumberOrNull(page) || !super.isNumberOrNull(itemsPerPage))
                    return EMPTY;
                
                if(page < 1 || itemsPerPage < 1)
                    return EMPTY; 
                
                return of(<Page>{page: super.getNumber(page), itemsPerPage: super.getNumber(itemsPerPage)});
                }),
                flatMap(page => {                      
                return forkJoin(of(page), this.service.getAll(page));
                }),
                flatMap(([page, pagination])=> {
                    this._totalItems = pagination.totalItems;
                    this._totalItemsPerPage = pagination.items.length;
                    this.page = page;
                    return of(pagination);
                }),
                shareReplay()
            );
        }
        return this._pagination$;
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


}