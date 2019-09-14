import { SortVO } from './sort-vo';
//VO com os parâmetros de entrada da paginação.
export interface PageInputVO {
    //Número da página atual.
    pageNumber: number;
    //Número máximo de elementos que será exibidos na página atual.
    size: number;
    //Número de elementos retornados após a consulta.    
    totalElements: number;
    //O filtro da consulta foi alterado.
    changedQuery: boolean;
    //Consulta ordenada pelos campos informados.
    sort: SortVO[];
}