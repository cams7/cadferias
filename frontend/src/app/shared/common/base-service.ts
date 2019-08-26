import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from './base';
import { PaginationVO } from '../model/vo/pagination-vo';
import { SortOrder } from './../../shared/common/sort-field.directive';
import { BaseEntity } from '../model/base-entity';

export abstract class BaseService<E extends BaseEntity> extends Base {

    constructor(
        protected http: HttpClient,
        protected API_URL: string
    ) { 
        super();
    }

    getAll$(pageAndSort?: PageAndSort, searchParams?:  Map<string, any>): Observable<PaginationVO<E>> {
        let params = new HttpParams();   

        if(pageAndSort) {
            if(pageAndSort.page)
                params = params.append('_page', <any>pageAndSort.page);

            if(pageAndSort.itemsPerPage)
                params = params.append('_limit', <any>pageAndSort.itemsPerPage);

            if(pageAndSort.sort && pageAndSort.order) {
                params = params.append('_sort', pageAndSort.sort);
                params = params.append('_order', pageAndSort.order);    
            }
        }
        
        if(searchParams && searchParams.size > 0)
            params = Array.from(searchParams.keys()).reduce((params, key)=>{
                return params.append(`${key}_like`, searchParams.get(key));
            }, params);
        
        return this.http.get(this.API_URL, { params: params, observe: 'response' }).pipe<PaginationVO<E>>(
            map(response => <PaginationVO<E>>{
                totalItems: Number(response.headers.get('X-Total-Count')), 
                items: response.body as E[]
            })
        );
    }
    
    getById$(id: number) {
        return this.http.get<E>(`${this.API_URL}/${id}`);
    }

    protected create$(entity: E) {
        return this.http.post<E>(this.API_URL, entity);
    }

    protected update$(entity: E) {
        return this.http.put<E>(`${this.API_URL}/${entity.id}`, entity);
    }

    save$(entity: E) {
        if (entity.id)
            return this.update$(entity);

        return this.create$(entity);
    }

    remove$(id: number) {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    get shortApiUrl() {
        return this.API_URL.substring(this.API_URL.search(/\/(\w+)$/));
    }
}

export interface Page {
    page: number; 
    itemsPerPage: number;   
}

export interface PageAndSort extends Page  {
    sort: string;
    order: SortOrder    
}
