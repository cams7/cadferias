//VO com os parâmetros da ordernação.
export interface SortVO {
    //Nome do campo ordernado.
    property: string;
    //Ordenação Acendente, Descendente ou Não informado.
    direction: Direction;
}
export enum Direction {
    ASC = 'ASC', 
    DESC = 'DESC', 
    UNINFORMED = 'UNINFORMED'
}