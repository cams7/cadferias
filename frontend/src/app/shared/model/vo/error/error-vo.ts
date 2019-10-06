import { MessageVO } from '../message/message-vo';

export interface ErrorVO extends MessageVO {
    timestamp: number;
    status: number;
    error: string;
    exception: string;
    exceptionMessage: string;
    path: string;
}

export enum ErrorException {
    RESOURCE_NOT_FOUND = 'br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException',
    INVALID_DATA = 'br.com.cams7.feriasfuncionarios.error.InvalidDataException',
    METHOD_ARGUMENT_NOT_VALID = 'org.springframework.web.bind.MethodArgumentNotValidException',
    //JSON parse error: Cannot deserialize value of type `java.lang.Long` from String "abc": not a valid Long value
    HTTP_MESSAGE_NOT_READABLE = 'org.springframework.http.converter.HttpMessageNotReadableException',
    MISSING_SERVLET_REQUEST_PARAMETER= 'org.springframework.web.bind.MissingServletRequestParameterException',
    //Failed to convert value of type 'java.lang.String' to required type 'java.lang.Long'
    METHOD_ARGUMENT_TYPE_MISMATCH = 'org.springframework.web.method.annotation.MethodArgumentTypeMismatchException',
    CONSTRAINT_VIOLATION = 'javax.validation.ConstraintViolationException',
    //Not-null property references a transient value - transient instance must be saved before current operation 
    INVALID_DATA_ACCESS_API_USAGE ='org.springframework.dao.InvalidDataAccessApiUsageException',
    //integrity constraint violation: NOT NULL check constraint
    //integrity constraint violation: foreign key no parent 
    DATA_INTEGRITY_VIOLATION = 'org.springframework.dao.DataIntegrityViolationException'
}