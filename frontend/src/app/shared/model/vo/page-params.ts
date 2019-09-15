import { Direction } from './pagination/sort-vo';

export interface PageParams {
    page: number; 
    itemsPerPage: number;   
}

export interface PageAndSortParams extends PageParams  {
    sort: string;
    order: Direction    
}