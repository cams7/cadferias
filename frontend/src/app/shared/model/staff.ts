import { Auditable } from './auditable';
import { GET_BY_SEARCH_REL, GET_BY_ID_REL, GET_WITH_AUDIT_BY_ID_REL, UPDATE_REL, DELETE_REL } from './base-entity';

//Entidade que representa a equipe.
export interface Staff extends Auditable {
    //Nome da equipe.
    name: string;
}

export const STAFF_ENDPOINT = 'StaffEndpoint';
export const STAFF_ENDPOINT_GET_BY_SEARCH_REL = `${STAFF_ENDPOINT}.${GET_BY_SEARCH_REL}`;
export const STAFF_ENDPOINT_GET_BY_ID_REL = `${STAFF_ENDPOINT}.${GET_BY_ID_REL}`;
export const STAFF_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL = `${STAFF_ENDPOINT}.${GET_WITH_AUDIT_BY_ID_REL}`;
export const STAFF_ENDPOINT_UPDATE_REL = `${STAFF_ENDPOINT}.${UPDATE_REL}`;   
export const STAFF_ENDPOINT_DELETE_REL = `${STAFF_ENDPOINT}.${DELETE_REL}`;
