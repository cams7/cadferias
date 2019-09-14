import { Auditable } from './auditable';
import { Employee } from './employee';

//Entidade que representa a férias do funcionário.
export interface Vacation extends Auditable {
    //Funcionário do qual pertence a férias.
    employee: Employee;
    //Data inicial da férias.
    startDate: Date;
    //Data final da férias.
    endDate: Date;    
}
