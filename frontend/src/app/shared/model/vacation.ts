import { Auditable } from './auditable';
import { Employee } from './employee';
import { GET_BY_SEARCH_REL, GET_BY_ID_REL, GET_WITH_AUDIT_BY_ID_REL, UPDATE_REL, DELETE_REL } from './base-entity';

//Entidade que representa a férias do funcionário.
export interface Vacation extends Auditable {
    //Funcionário do qual pertence a férias.
    employee: Employee;
    //Data inicial da férias.
    startDate: Date;
    //Data final da férias.
    endDate: Date;    
}

export const VACATION_ENDPOINT = 'VacationEndpoint';
export const VACATION_ENDPOINT_GET_BY_SEARCH_REL = `${VACATION_ENDPOINT}.${GET_BY_SEARCH_REL}`;
export const VACATION_ENDPOINT_GET_BY_ID_REL = `${VACATION_ENDPOINT}.${GET_BY_ID_REL}`;
export const VACATION_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL = `${VACATION_ENDPOINT}.${GET_WITH_AUDIT_BY_ID_REL}`;
export const VACATION_ENDPOINT_UPDATE_REL = `${VACATION_ENDPOINT}.${UPDATE_REL}`;   
export const VACATION_ENDPOINT_DELETE_REL = `${VACATION_ENDPOINT}.${DELETE_REL}`;
