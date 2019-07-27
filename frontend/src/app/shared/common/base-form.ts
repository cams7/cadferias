import { Base } from './base';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

export abstract class BaseForm extends Base {

    public form: FormGroup;
    protected _submitted = false;

    constructor() { 
        super();
    }

    abstract unchangedData(): Observable<boolean>;

    classError(fieldName: string) {
        return { 'is-invalid': this._submitted && this.hasError(fieldName)};
    }

    hasFieldError(fieldName: string, typeError: string) {
        return this.hasError(fieldName) && this.hasError(fieldName)[typeError];
    }

    private hasError(field: string) {
        return this.form.get(field).errors;
    }

    get submitted() {
        return this._submitted;
    }
}
