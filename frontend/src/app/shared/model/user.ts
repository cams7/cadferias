import { Auditable } from './auditable';

//Entidade que representa o usuário.
export interface User extends Auditable {
    //E-mail do usuário.
    email: string;
    //Senha do usuário.
    password: string;
}
