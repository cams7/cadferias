import { BaseModel } from './base-model';
import { Employee } from './employee';

export interface Vacation extends BaseModel {
    vacationStartDate: Date;
    vacationEndDate: Date;
    employee: Employee;
}
