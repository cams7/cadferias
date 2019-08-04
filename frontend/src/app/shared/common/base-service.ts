import { HttpClient, HttpParams } from "@angular/common/http";

import { Base } from './base';
import { tap, map } from 'rxjs/operators';
import { PaginationVO } from '../model/vo/pagination-vo';
import { Observable } from 'rxjs';

export abstract class BaseService<T> extends Base {

    constructor(
        protected http: HttpClient,
        protected API_URL: string
    ) { 
        super();
    }

    getAll(page?: Page): Observable<PaginationVO<T>> {
        let params = new HttpParams();
        if(page && page.page)
            params = params.append('_page', <any>page.page);
        if(page && page.itemsPerPage)
            params = params.append('_limit', <any>page.itemsPerPage);
        return this.http.get<T[]>(this.API_URL, { params: params, observe: 'response' }).pipe(
            map(response => <PaginationVO<T>>{
                totalItems: <any>response.headers.get('X-Total-Count'), 
                items: response.body
            })
        );
    }
    
    getById(id: number) {
        return this.http.get<T>(`${this.API_URL}/${id}`);
    }

    protected create(record: T) {
        return this.http.post<T>(this.API_URL, record);
    }

    protected update(record: T) {
        return this.http.put<T>(`${this.API_URL}/${record["id"]}`, record);
    }

    save(record: T) {
        if (record["id"])
            return this.update(record);

        return this.create(record);
    }

    remove(id: number) {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    get shortApiUrl() {
        return this.API_URL.substring(this.API_URL.search(/\/(\w+)$/));
    }
}

export interface Page {
    page: number; 
    itemsPerPage: number    
}
