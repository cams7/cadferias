import { SortVO } from './pagination/sort-vo';

//VO com os parâmetros do filtro de busca do select.
export interface SearchBySelectVO {
    //Valor informado durante a pesquisa.
    searchValue: string;
    //Consulta ordenada pelo campo informado.
    sort: SortVO;
    //Número máximo de elementos que será carregados na consulta.
    size: number;
}