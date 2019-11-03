import { Auditable } from './auditable';
import { User } from './user';
import { Staff } from './staff';
import { EmployeePhoto } from './employee-photo';

//Entidade que representa o funcionário.
export interface Employee extends Auditable {
    //Usuário vinculado ao funcionário.
    user: User;
    //Equipe a qual o funcionário é membro.
    staff: Staff;
    //Data da contratação do funcionário.
    hiringDate: Date;
    //Matricula do funcionário.
    employeeRegistration: string;
    employeePhoto: string;   
    //Nome do funcionário.
    name: string;
    //Data de nascimento do funcionário.		
    birthDate: Date;
    //Número de telefone do funcionário.
    phoneNumber: string;
    //Endereço do funcionário.
    address: Address; 
    //Fotos do funcionário.
    photos: EmployeePhoto[];
}

//Entidade que representa o endereço do funcionário.
export interface Address {
    //Rua onde onde residi o funcionário.
    street: string;
    //Número da residência do funcionário.
    houseNumber: number;
    //Bairro onde onde residi o funcionário.
    neighborhood: string;
    //Cidade onde onde residi o funcionário.
    city: string;
    //Estado onde onde residi o funcionário.
    state: State;
}

export enum State {
    AC='AC', 
    AL='AL', 
    AM='AM', 
    AP='AP', 
    BA='BA', 
    CE='CE', 
    DF='DF',
    ES='ES', 
    GO='GO', 
    MA='MA', 
    MG='MG', 
    MS='MS',
    MT='MT', 
    PA='PA', 
    PB='PB', 
    PE='PE', 
    PI='PI', 
    PR='PR',
    RJ='RJ', 
    RN='RN', 
    RO='RO', 
    RR='RR', 
    RS='RS',
    SC='SC', 
    SE='SE', 
    SP='SP', 
    TO='TO'
}
