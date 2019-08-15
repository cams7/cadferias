import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from './base';
import { PaginationVO } from '../model/vo/pagination-vo';
import { SortOrder } from 'src/app/shared/common/sort-field.directive';

export abstract class BaseService<T> extends Base {

    constructor(
        protected http: HttpClient,
        protected API_URL: string
    ) { 
        super();
    }

    getAll$(pageAndSort?: PageAndSort, searchParams?:  Map<string, any>): Observable<PaginationVO<T>> {
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
        
        return this.http.get<T[]>(this.API_URL, { params: params, observe: 'response' }).pipe(
            map(response => <PaginationVO<T>>{
                totalItems: <any>response.headers.get('X-Total-Count'), 
                items: response.body
            })
        );
    }
    
    getById$(id: number) {
        return this.http.get<T>(`${this.API_URL}/${id}`);
    }

    protected create$(record: T) {
        return this.http.post<T>(this.API_URL, record);
    }

    protected update$(record: T) {
        return this.http.put<T>(`${this.API_URL}/${record["id"]}`, record);
    }

    save$(record: T) {
        if (record["id"])
            return this.update$(record);

        return this.create$(record);
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
