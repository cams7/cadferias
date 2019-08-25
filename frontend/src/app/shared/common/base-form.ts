import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { MASKS } from 'ng-brazil';

import { Base, BR_DATE_FORMAT } from './base';
import { AppEventsService } from '../events.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { BaseEntity } from '../model/base-entity';

const DEBOUNCE_TIME = 500;
export abstract class BaseForm<E extends BaseEntity> extends Base implements OnInit {
          
    private _brazilMasks = MASKS;

    public form: FormGroup;
    protected _submitted = false;

    private _entity: E;

    constructor(
        protected route: ActivatedRoute,
        protected eventsService: AppEventsService,
        protected confirmModalService: ConfirmModalService
    ) { 
        super();
    }

    ngOnInit() {
        this._entity = this.route.snapshot.data['entity'];          
    }

    abstract submit$(): Observable<E>;

    onSubmit() {        
        this._submitted = true;
    
        if (this.form.invalid || !(this.form.touched && this.form.dirty)) 
          return;

        this.submit$().subscribe(entity => {
            this.form.markAsPristine();
            this.form.markAsUntouched();

            if(!this.isRegistred)
                this._entity = entity;
        });
    } 
    
    unchangedData$(): Observable<boolean> {
        return of(!this.form || !(this.form.touched && this.form.dirty)).pipe(
            flatMap(unchanged => {
                if(unchanged)
                    return of(true);
                return this.confirmModalService.showConfirm$('Sair da página','Os dados do formulário foram modificados, você deseja realmente sair dessa página?');
            })
        );
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

    trackById(entity: BaseEntity) {
        return entity.id;
    }

    private hasError(field: string) {
        return this.form.get(field).errors;
    }

    get submitted() {
        return this._submitted;
    }

    get bsConfig() {
        return { 
            dateInputFormat: BR_DATE_FORMAT.toUpperCase(),
            isAnimated: true,
            adaptivePosition: true,
            containerClass: 'theme-dark-blue' 
        }
    }

    get brazilMasks() {
        return this._brazilMasks;
    }

    get entity() {
        return this._entity;
    }

    get isRegistred() {
        return !!this._entity.id;
    }

    get debounceTime() {
        return DEBOUNCE_TIME;
    }
}
