import { AuditableFilterVO } from './auditable-filter-vo';

//Filtro de busca com os dados da equipe.
export interface StaffFilterVO extends AuditableFilterVO {
    //Nome da equipe.
    name: string;
}