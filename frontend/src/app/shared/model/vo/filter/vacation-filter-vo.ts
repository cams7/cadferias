import { AuditableFilterVO } from './auditable-filter-vo';
import { EmployeeFilterVO } from './employee-filter-vo';

export interface VacationFilterVO extends AuditableFilterVO {
    //Data inicial da férias.
	startDate: Date[];

	//Data final da férias.
	endDate: Date[];

	//Funcionário do qual pertence a férias.
	employee: EmployeeFilterVO;
}