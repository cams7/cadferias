import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { filter, map, takeUntil, shareReplay, tap } from 'rxjs/operators';
import { ErrorsService } from '../../errors.service';
import { FieldErrorVO } from '../../model/vo/error/field-validation-error-vo';

@Component({
  selector: 'field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit, OnDestroy {
    
  @Input() fieldName: string;
  @Output() validation = new EventEmitter();

  private endSubject = new Subject<boolean>();
  private _errors$: Observable<FieldErrorVO[]>;

  constructor(
    private errorsService: ErrorsService
  ) { }

  ngOnInit() {
    this._errors$ = this.errorsService.getFieldErrors$(this.fieldName).pipe(
      tap(errors => {
        const validation = <FieldValidationVO>{};
        validation.fieldName = this.fieldName;
        validation.hasErros = errors && errors.length > 0;
        this.validation.emit(validation);
      }),
      takeUntil(this.end$),
      shareReplay()
    );
  }

  ngOnDestroy() {
    this.endSubject.next(true);
    this.endSubject.complete();
  }

  private get end$() {
    return this.endSubject.pipe(
      filter(end => end)
    );
  }

  get messages$() {
    return this._errors$.pipe(
      map(errors => errors.map(error => error.defaultMessage))
    );
  }
}

export interface FieldValidationVO {
  fieldName: string;
  hasErros: boolean;
}