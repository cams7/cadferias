import { BaseEntity } from '../../base-entity';
import { PageInputVO } from './page-input-vo';
//VO com os parâmetros de saída da paginação.
export interface PageVO<E extends BaseEntity> extends PageInputVO {
    //Conteúdo da página atual.
    content: E[];
    //Total de elementos da página atual.
    numberOfElements: number;
    //Número total de páginas.
    totalPages: number;
    //É a primeira página.
    first: boolean;
    //É a última página.
    last: boolean;
}
