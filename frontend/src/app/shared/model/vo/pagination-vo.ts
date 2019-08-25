import { BaseEntity } from '../base-entity';

export interface PaginationVO<E extends BaseEntity> {
    totalItems: number;
    items: E[];
}
