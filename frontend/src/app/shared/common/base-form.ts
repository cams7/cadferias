import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { MASKS } from 'ng-brazil';

import { Base, BR_DATE_FORMAT } from './base';
import { EventsService } from '../events.service';
import { ErrorsService } from '../errors.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { BaseEntity } from '../model/base-entity';
import { FieldValidationVO } from './field-error-message/field-error-display.component';

const DEBOUNCE_TIME = 500;
export abstract class BaseForm<E extends BaseEntity> extends Base implements OnInit {
          
    private _brazilMasks = MASKS;

    public form: FormGroup;
    protected _submitted = false;

    private _entity: E;

    private _validation = new Map<string, boolean>();

    constructor(
        protected route: ActivatedRoute,
        protected eventsService: EventsService,
        protected errorsService: ErrorsService,
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
    
        this.submit$().subscribe(entity => {
            this._submitted = false;
            this.errorsService.addError();
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

    classError(fieldNames: string | string[]) {
        if(!this.submitted || !fieldNames)
            return { 'is-invalid': false };
        
        if(typeof fieldNames == 'string')
            return { 'is-invalid': this.hasError(fieldNames)};
        
        for(let fieldName in fieldNames)
            if(this.hasError(fieldName))
                return { 'is-invalid': true};        
    }

    private hasError(fieldName: string) {
        return this._validation.size > 0 && this._validation.get(fieldName);
    }

    trackById(entity: BaseEntity) {
        return entity.id;
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

    get bsDaterangeConfig() {
        return { 
            rangeInputFormat: BR_DATE_FORMAT.toUpperCase(),
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

    set validation(validation: FieldValidationVO) {
        this._validation.set(validation.fieldName, validation.hasErros);
    }
}
