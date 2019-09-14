import { Auditable } from './auditable';

//Entidade que representa a equipe.
export interface Staff extends Auditable {
    //Nome da equipe.
    name: string;
}
