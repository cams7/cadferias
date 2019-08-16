import { OnInit } from '@angular/core';
import { Base } from './base';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';


export abstract class BaseForm extends Base implements OnInit {    

    public form: FormGroup;
    protected _submitted = false;

    constructor() { 
        super();
    }

    ngOnInit() {
    }

    abstract submit(): void;

    onSubmit() {        
        this._submitted = true;
    
        if (this.form.invalid)
          return;
    
        this.submit();
    } 

    unchangedData$(): Observable<boolean> {
        return of(true);
    }

    classError(fieldName: string) {
        return { 'is-invalid': this._submitted && this.hasError(fieldName)};
    }

    hasRequiredError(fieldName: string) {
        return this.hasFieldError(fieldName, 'required');
    }

    hasEmailError(fieldName: string) {
        return this.hasFieldError(fieldName, 'email');
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
