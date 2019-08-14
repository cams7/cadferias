import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export abstract class Base implements OnDestroy { 
    
    private endSubject = new Subject<boolean>();

    protected isNumber(value: string | number) {
        return (value && !isNaN(Number(value)));
    }

    protected isNumberOrNull(value: string | number) {
        return !value || this.isNumber(value);
    }

    protected getNumber(value: string | number) {
        if(!value)
            return null;
        
        return Number(value);
    }

    ngOnDestroy() {
        this.endSubject.next(true);
        this.endSubject.complete();
    }

    protected get end$() {
        return this.endSubject.pipe(
            filter(end => end)
        );
    }
}
