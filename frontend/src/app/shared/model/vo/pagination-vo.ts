import { BaseModel } from '../base-model';

export interface PaginationVO<T extends BaseModel> {
    totalItems: number;
    items: T[];
}
