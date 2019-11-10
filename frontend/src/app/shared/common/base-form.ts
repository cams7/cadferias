import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { flatMap, filter } from 'rxjs/operators';

import { MASKS } from 'ng-brazil';

import { Base, BR_DATE_FORMAT } from './base';
import { ErrorsService } from '../errors.service';
import { ConfirmModalService } from '../confirm-modal/confirm-modal.service';
import { BaseEntity, Link } from '../model/base-entity';
import { FieldValidationVO } from './field-error-message/field-error-display.component';
import { MessageType } from '../model/vo/message/message-vo';
import { ErrorException } from '../model/vo/error/error-vo';

const DEBOUNCE_TIME = 500;
export abstract class BaseForm<E extends BaseEntity> extends Base implements OnInit {
          
    private _brazilMasks = MASKS;

    public form: FormGroup;
    protected _submitted = false;

    private _entity: E;

    private _validation = new Map<string, boolean>();
    private subscriptions: Subscription[] = [];

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected errorsService: ErrorsService,
        protected confirmModalService: ConfirmModalService
    ) { 
        super();
    }

    ngOnInit() {
        this._entity = this.route.snapshot.data['entity']; 
        this.subscriptions.push( 
            this.errorsService.erros$.pipe(
                filter(error => MessageType.WARNING == error.type && ErrorException.EXPIRED_JWT == error.exception)
            ).subscribe(_ => {
                this._submitted = false;
                /*if(this.isRegistred) {
                    this.form.markAsTouched();
                    this.form.markAsDirty();
                }*/
            })
        );        
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    abstract submit$(): Observable<E>;

    onSubmit() {
        if ((this._submitted || this.isRegistred) && !(this.form.touched && this.form.dirty))
          return; 
          
        this._submitted = true;

        this.form.markAsUntouched();
        this.form.markAsPristine();       
        
        this.submit$().subscribe(entity => {
            this._submitted = false;
            this.errorsService.addError();

            if(!this.isRegistred) {
                this.router.navigate([entity.entityId], {relativeTo: this.route.parent});
            }
        });
    } 
    
    unchangedData$(): Observable<boolean> {
        return of(!(this.submitted || (this.form && this.form.touched && this.form.dirty))).pipe(
            flatMap(unchanged => {
                if(unchanged)
                    return of(true);
                return this.confirmModalService.showConfirm$('Sair da página','Os dados do formulário foram modificados, você realmente deseja sair dessa página?');
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
        return entity.entityId;
    }
    
    abstract get getBySearchRel(): Link;
    abstract get getWithAuditByIdRel(): Link;
    abstract get updateRel(): Link;
    abstract get submitTooltip(): string;

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
        return this._entity && this._entity.entityId;
    }

    get debounceTime() {
        return DEBOUNCE_TIME;
    }

    set validation(validation: FieldValidationVO) {
        this._validation.set(validation.fieldName, validation.hasErros);
    }
}