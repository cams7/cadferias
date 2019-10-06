import { Direction } from './pagination/sort-vo';

export interface PageParamsVO {
    page: number; 
    itemsPerPage: number;   
}

export interface PageAndSortParamsVO extends PageParamsVO  {
    sort: string;
    order: Direction    
}