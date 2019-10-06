import { ErrorVO } from './error-vo';

export interface FieldValidationErrorVO extends ErrorVO {
    errors: FieldErrorVO[];
}

export interface FieldErrorVO extends ArgumentErrorVO{
    objectName: string;
    field: string;
    rejectedValue: string;
    bindingFailure: boolean;
}

export interface ArgumentErrorVO {
    codes: string[];
    arguments: any[];//ArgumentErrorVO, number
    defaultMessage: string;
    code: string;
}