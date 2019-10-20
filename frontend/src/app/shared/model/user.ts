import { Auditable } from './auditable';
import { Role } from './role';

//Entidade que representa o usuário.
export interface User extends Auditable {
    //E-mail do usuário.
    email: string;
    //Senha do usuário.
    password: string;
    //Funções do usuário
    roles: Role[];
}
