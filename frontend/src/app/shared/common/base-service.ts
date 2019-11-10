import { HttpClient } from "@angular/common/http";

import { Base } from './base';
import { PageVO } from '../model/vo/pagination/page-vo';
import { BaseEntity, Link, RequestMethod } from '../model/base-entity';
import { AuditableFilterVO } from '../model/vo/filter/auditable-filter-vo';
import { SearchVO } from '../model/vo/search-vo';
import { EMPTY, Observable } from 'rxjs';

export abstract class BaseService<E extends BaseEntity, F extends AuditableFilterVO> extends Base {

    protected readonly searchSize = 7;

    constructor(        
        protected http: HttpClient,
        protected API_URL: string      
    ) { 
        super();
    }

    getBySearch$(search: SearchVO<F>) {
        return this.http.post<PageVO<E>>(`${this.API_URL}/search`, search);
    }
        
    getById$(id: number) {        
        return this.http.get<E>(`${this.API_URL}/${id}`);
    }

    getWithAuditById$(id: number) {        
        return this.http.get<E>(`${this.API_URL}/${id}/details`);
    }

    protected create$(entity: E) {
        return this.http.post<E>(this.API_URL, entity);
    }

    protected update$(entity: E) {
        return this.http.put<E>(this.API_URL, entity);
    }

    save$(entity: E) {
        if (entity.entityId)
            return this.update$(entity);

        return this.create$(entity);
    }

    remove$(id: number) {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    get shortApiUrl() {
        return this.API_URL.substring(this.API_URL.search(/\/(\w+)$/));
    }

    requestByLink$(link: Link, content?: E | SearchVO<F>) {
        let request$: Observable<E | PageVO<E> | void> = EMPTY;

        if(!!link)
            switch (link.type) {
                case RequestMethod.GET: {     
                    request$ = this.http.get<E>(link.href);          
                    break;
                }
                case RequestMethod.POST: {   
                    if(!!content)  
                        request$ = this.http.post<E | PageVO<E>>(link.href, content);          
                    break;
                }
                case RequestMethod.PUT: {
                    if(!!content)     
                        request$ = this.http.put<E>(link.href, content);          
                    break;
                }
                case RequestMethod.DELETE: {    
                    request$ = this.http.delete<void>(link.href);           
                    break;
                }
                default:
                    break;
            }
        return request$;
    }
    
}