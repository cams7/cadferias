import { BaseEntity } from './base-entity';
import { Employee } from './employee';

export interface Vacation extends BaseEntity {
    vacationStartDate: Date;
    vacationEndDate: Date;
    employee: Employee;
}
