import { BaseEntity } from './base-entity';

export interface Role extends BaseEntity {
    name: RoleName;
}
export enum RoleName {
    ROLE_USER='ROLE_USER',
    ROLE_ADMIN='ROLE_ADMIN'
}