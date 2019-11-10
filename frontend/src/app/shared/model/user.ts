import { Auditable } from './auditable';
import { Role } from './role';
import { GET_BY_SEARCH_REL, GET_BY_ID_REL, GET_WITH_AUDIT_BY_ID_REL, UPDATE_REL, DELETE_REL } from './base-entity';

//Entidade que representa o usuário.
export interface User extends Auditable {
    //E-mail do usuário.
    email: string;
    //Senha do usuário.
    password: string;
    //Funções do usuário
    roles: Role[];
}

export const USER_ENDPOINT = 'UserEndpoint';
export const USER_ENDPOINT_GET_BY_SEARCH_REL = `${USER_ENDPOINT}.${GET_BY_SEARCH_REL}`;
export const USER_ENDPOINT_GET_BY_ID_REL = `${USER_ENDPOINT}.${GET_BY_ID_REL}`;
export const USER_ENDPOINT_GET_WITH_AUDIT_BY_ID_REL = `${USER_ENDPOINT}.${GET_WITH_AUDIT_BY_ID_REL}`;
export const USER_ENDPOINT_UPDATE_REL = `${USER_ENDPOINT}.${UPDATE_REL}`;   
export const USER_ENDPOINT_DELETE_REL = `${USER_ENDPOINT}.${DELETE_REL}`;
