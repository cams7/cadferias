import { BaseEntity } from './base-entity';
import { User } from './user';
import { Staff } from './staff';

export interface Employee extends BaseEntity {
    id: number;
    hiringDate: Date;
    employeePhoto: string;
    employeeRegistration: string;
    user: User;
    staff: Staff;
    name: string;		
    birthDate: Date;
    address: Address;
    phoneNumber: string;
}

export interface Address {
    street: string;
    houseNumber: number;
    neighborhood: string;
    city: string;
    state: string;
}
