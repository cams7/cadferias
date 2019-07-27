import { HttpClient } from "@angular/common/http";

import { Base } from './base';

export abstract class BaseService<T> extends Base {

    constructor(
        protected http: HttpClient,
        protected API_URL: string
    ) { 
        super();
    }

    getAll() {
        return this.http.get<T[]>(this.API_URL);
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
}
