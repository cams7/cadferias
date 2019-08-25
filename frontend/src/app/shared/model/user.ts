import { BaseEntity } from './base-entity';

export interface User extends BaseEntity {
    email: string;
    password: string;
}
