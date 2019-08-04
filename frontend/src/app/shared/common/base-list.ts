import { ViewChild, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { filter, finalize, delay, delayWhen, concatMap } from 'rxjs/operators';

import { Base } from './base';
import { BaseService, Page } from './base-service';

export abstract class BaseList<T> extends Base implements AfterViewChecked {
               
    readonly previousText = '&lsaquo;';
    readonly nextText = '&rsaquo;'; 
    readonly firstText = '&laquo;'; 
    readonly lastText = '&raquo;';
    
    readonly showDirectionLinks = true;
    readonly showBoundaryLinks = true;
    readonly maxSize = 5;
    readonly rotate = true;

    numPages: number;

    protected _totalItems: number;
    private _page = <Page>{};
    
    @ViewChild('pagination', { read: ElementRef, static:true }) pagination: ElementRef;

    private loadAllPages = new Subject<boolean>();
    private afterViewChecked = false;
 
    constructor(
        protected renderer: Renderer2,
        protected router: Router,
        private service: BaseService<T>
    ) { 
        super();
    }

    ngAfterViewChecked() {
        if(!this.afterViewChecked && this.pagination) {     
            const nodes: NodeList = this.pagination.nativeElement.querySelectorAll('li.pagination-page>a.page-link');
            if(nodes && nodes.length == this.maxSize) {
                //console.log('nodes: ', nodes);
                this.afterViewChecked = true;
                this.loadAllPages.next(true);
            }
        }       
    }

    get totalItems() {
        return this._totalItems;
    }

    set pageChanged(pageChanged: Page) {
        this._page = pageChanged;
        this.router.navigate([this.service.shortApiUrl], { queryParams: pageChanged });
    }

    get page() {
        return this._page;
    }
    
    set page(page: Page) {        
        of(page).pipe(
            filter(page => {                
                const modifiedPage = this._page.page != page.page || this.page.itemsPerPage != page.itemsPerPage;
                //console.log('_page: ', this.page, ', page: ', page, ', modifiedPage: ', modifiedPage);
                return modifiedPage;
            }),
            delayWhen(_ => this.loadAllPages.pipe(
                filter(allPagesLoaded => allPagesLoaded)
            )),
            concatMap(page => {
                return of(page).pipe(
                    delay(10)
                )
            }),
            concatMap(page => {
                this._page.page = page.page;
                return of(page).pipe(
                    delay(10)
                )
            }),
            finalize(() => {
                this.loadAllPages.complete();
                //console.log('page was finalized');
            })
        ).subscribe(page => {
            const ACTIVE_CLASS = 'active';
            const nodes: NodeList = this.pagination.nativeElement.querySelectorAll('li.pagination-page');   
            if(nodes)          
                for(let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    if((<any>node).classList.contains(ACTIVE_CLASS)) {
                        this.renderer.removeClass(node, ACTIVE_CLASS);
                        continue;
                    }
                    if((<any>node).querySelector('a.page-link').textContent == page.page) {
                        //console.log('node: ', node);
                        this.renderer.addClass(node, ACTIVE_CLASS);
                        break;
                    }
                }
        });
        this._page.itemsPerPage = page.itemsPerPage;         
    }
}