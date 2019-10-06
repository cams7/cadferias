import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorVO, ErrorException } from './model/vo/error/error-vo';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from './model/vo/message/message-vo';
import { FieldValidationErrorVO, FieldErrorVO } from './model/vo/error/field-validation-error-vo';
import { filter, map } from 'rxjs/operators';

const ERROR_TITLE = 'Erro';
const ERROR_MESSAGE = 'Ocorreu um erro. Por favor, entre em contato com o administrador do sistema.';
const RESPONSE_ERROR = 'error';
const RESPONSE_STATUS = 'status';
const RESPONSE_URL = 'url';
const RESPONSE_ERROR_TYPE = 'type';
const RESPONSE_ERROR_TITLE = 'title';
const RESPONSE_ERROR_MESSAGE = 'message';
const RESPONSE_ERROR_CODEMESSAGE = 'codeMessage';
const RESPONSE_ERROR_STATUS = 'status';
const RESPONSE_ERROR_ERROR = 'error';
const RESPONSE_ERROR_ERRORS = 'errors';
const RESPONSE_ERROR_TRACE = 'trace';
const RESPONSE_ERROR_EXCEPTION = 'exception';
const RESPONSE_ERROR_EXCEPTIONMESSAGE = 'exceptionMessage';
const RESPONSE_ERROR_TIMESTAMP = 'timestamp';
const RESPONSE_ERROR_PATH = 'path';
@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  private errorSubject = new Subject<ErrorVO>();

  constructor() { }

  getError(response: HttpErrorResponse) {
    let error: ErrorVO;
    if(this.isValidError(response)) {      
      try {
        error = this.getErrorByResponseError(JSON.parse(response[RESPONSE_ERROR]));
      } catch(_) {
        error = this.getErrorByResponseError(response[RESPONSE_ERROR]);
      }
    } else
      error = this.getErrorByResponse(response);

    this.addError(error);
    return error;
  }

  private isValidError(response: HttpErrorResponse) {
    const responseError = response[RESPONSE_ERROR];
    if(!responseError)
      return false;
        
    return responseError[RESPONSE_ERROR_STATUS] && responseError[RESPONSE_ERROR_ERROR] && 
    (responseError[RESPONSE_ERROR_TRACE] || (responseError[RESPONSE_ERROR_EXCEPTION] && responseError[RESPONSE_ERROR_EXCEPTIONMESSAGE])) && 
      responseError[RESPONSE_ERROR_TIMESTAMP] /*&& responseError[RESPONSE_ERROR_PATH]*/ && responseError[RESPONSE_ERROR_MESSAGE];       
  }

  private getErrorByResponse(response: HttpErrorResponse) {
    const error = <ErrorVO>{};
    error.status = Number(response[RESPONSE_STATUS]);      
    error.path = response[RESPONSE_URL];
    error.title = ERROR_TITLE;
    error.message = ERROR_MESSAGE;
    error.type = MessageType.DANGER;
    return error;
  }  

  private getErrorByResponseError (responseError: any) {
    if(!!responseError[RESPONSE_ERROR_ERRORS]) {
      const error = <FieldValidationErrorVO>{};
      this.setError(responseError, error);
      error.errors = <FieldErrorVO[]>responseError[RESPONSE_ERROR_ERRORS];
      return error;
    }

    const error = <ErrorVO>{};
    this.setError(responseError, error);
    return error;
  }

  private setError(responseError: any, error: ErrorVO) {
    error.status = Number(responseError[RESPONSE_ERROR_STATUS]); 
    error.error = responseError[RESPONSE_ERROR_ERROR]; 
    error.exception = this.getException(responseError); 
    error.exceptionMessage = this.getExceptionMessage(responseError);    
    error.timestamp = this.getTimestamp(responseError);   
    error.path = responseError[RESPONSE_ERROR_PATH];   
    error.title = this.getMessageTitle(responseError);
    error.message = this.getMessage(responseError);      
    error.type = this.getMessageType(responseError);
    error.codeMessage = responseError[RESPONSE_ERROR_CODEMESSAGE];
  }

  private getException(responseError: any) {
    const exception: string = responseError[RESPONSE_ERROR_EXCEPTION];
    if(!!exception)
      return exception;

    const trace: string = responseError[RESPONSE_ERROR_TRACE];
    if(!!trace) { 
      const exceptions = Object.keys(ErrorException).map(key => ErrorException[key] as string);  
      for(let i=0; i < exceptions.length; i++) {
        const exception = exceptions[i];
        if(trace.startsWith(exception))
          return exception;        
      }
    }
    return trace;
  }

  private getExceptionMessage(responseError: any) {
    const exceptionMessage: string = responseError[RESPONSE_ERROR_EXCEPTIONMESSAGE];
    if(!!exceptionMessage)
      return exceptionMessage;

    const message: string = responseError[RESPONSE_ERROR_MESSAGE];
    return message;
  }

  private getTimestamp(responseError: any) {
    const timestamp = responseError[RESPONSE_ERROR_TIMESTAMP];
    if(!timestamp)
      return undefined;

    if(!isNaN(Number(timestamp)))
      return timestamp;
    
    return new Date(timestamp).getTime();
  }

  private getMessageTitle(responseError: any) {
    const title: string = responseError[RESPONSE_ERROR_TITLE];
    if(!!title)
      return title;
    
    return ERROR_TITLE;
  }

  private getMessage(responseError: any) {
    const title = this.getMessageTitle(responseError);

    if(!!title) {
      const message = responseError[RESPONSE_ERROR_MESSAGE];
      return message;
    }

    return ERROR_MESSAGE;    
  }

  private getMessageType(responseError: any) {
    const type: string = responseError[RESPONSE_ERROR_TYPE];
    if(!!type)
      return MessageType[type];

    return MessageType.DANGER;
  }

  addError(error?: ErrorVO) {
    this.errorSubject.next(error);
  }

  end() {
    this.errorSubject.complete();
  }

  getFieldErrors$(field: string) {
    return this.errorSubject.pipe(
      map(error => error && !!error['errors'] ? (<FieldValidationErrorVO>error).errors.filter(error => error.field == field): [])
    );
  }

  get erros$() {
    return this.errorSubject.pipe(
      filter(error => error && !error['errors'])
    );
  }  
}
