import { AuditableFilterVO } from './auditable-filter-vo';
import { UserFilterVO } from './user-filter-vo';
import { StaffFilterVO } from './staff-filter-vo';
import { State } from '../../employee';

//Filtro de busca com os dados do funcionário.
export interface EmployeeFilterVO extends AuditableFilterVO {
    //Data da contratação do funcionário.
	hiringDate: Date[];

	//Matricula do funcionário.
	employeeRegistration: string;

	//Nome do funcionário.
	name: string;

	//Data de nascimento do funcionário.
	birthDate: Date[];

	//Número de telefone do funcionário.
	phoneNumber: string;

	//Endereço do funcionário.
	address: AddressFilterVO;

	//Usuário vinculado ao funcionário.
	user: UserFilterVO;

	//Equipe a qual o funcionário é membro.
	staff: StaffFilterVO;
}

//Filtro de busca com os dados do endereço do funcionário.
export interface AddressFilterVO {
    //Rua onde onde residi o funcionário.
    street: string;
    //Bairro onde onde residi o funcionário.
    neighborhood: string;
    //Cidade onde onde residi o funcionário.
    city: string;
    //Estado onde onde residi o funcionário.
    state: State;
}