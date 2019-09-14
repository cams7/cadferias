import { AuditableFilterVO } from './auditable-filter-vo';

//Filtro de busca com os dados do usuário.
export interface UserFilterVO extends AuditableFilterVO {
    email: string;
}