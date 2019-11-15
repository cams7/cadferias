/**
 * 
 */
package br.com.cams7.cadferias.model.vo.filter;

import java.time.LocalDate;

import br.com.cams7.cadferias.model.EmployeeEntity.Address.State;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author ceanm
 *
 */
@ApiModel(description = "Filtro de busca com os dados do funcionário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class EmployeeFilterVO extends AuditableFilterVO {

	@ApiModelProperty(notes = "Data da contratação do funcionário.", required = false, position = 4)
	private LocalDate[] hiringDate;

	@ApiModelProperty(notes = "Matricula do funcionário.", example = "123456789abc", required = false, position = 5)
	private String employeeRegistration;

	@ApiModelProperty(notes = "Nome do funcionário.", example = "José Silva Pinheiro", required = false, position = 6)
	private String name;

	@ApiModelProperty(notes = "Data de nascimento do funcionário.", required = false, position = 7)
	private LocalDate[] birthDate;

	@ApiModelProperty(notes = "Número de telefone do funcionário.", example = "3136457856", required = false, position = 8)
	private String phoneNumber;

	@ApiModelProperty(notes = "Endereço do funcionário.", required = false, position = 9)
	private AddressFilterVO address;

	@ApiModelProperty(notes = "Usuário vinculado ao funcionário.", required = false, position = 10)
	private UserFilterVO user;

	@ApiModelProperty(notes = "Equipe a qual o funcionário é membro.", required = true, position = 11)
	private StaffFilterVO staff;

	@ApiModel(description = "Filtro de busca com os dados do endereço do funcionário.")
	@Getter
	@Setter
	@NoArgsConstructor
	@ToString
	public static class AddressFilterVO {

		@ApiModelProperty(notes = "Rua onde onde residi o funcionário.", example = "Av. Francisco Sales", required = false, position = 0)
		private String street;

		@ApiModelProperty(notes = "Bairro onde onde residi o funcionário.", example = "Floresta", required = false, position = 1)
		private String neighborhood;

		@ApiModelProperty(notes = "Cidade onde onde residi o funcionário.", example = "Belo Horizonte", required = false, position = 2)
		private String city;

		@ApiModelProperty(notes = "Estado onde onde residi o funcionário.", example = "MG", required = false, position = 3)
		private State state;

	}
}
