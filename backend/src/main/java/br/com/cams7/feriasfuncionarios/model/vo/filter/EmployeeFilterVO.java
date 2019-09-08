/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.vo.filter;

import java.time.LocalDate;

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

	@ApiModelProperty(notes = "Data inicial da data da contratação do funcionário.", required = false, position = 6)
	private LocalDate startOfHiringDate;
	@ApiModelProperty(notes = "Data final da data da contratação do funcionário.", required = false, position = 7)
	private LocalDate endOfHiringDate;

	@ApiModelProperty(notes = "Matricula do funcionário.", example = "123456789abc", required = false, position = 8)
	private String employeeRegistration;

	@ApiModelProperty(notes = "Nome do funcionário.", example = "José Silva Pinheiro", required = false, position = 9)
	private String name;

	@ApiModelProperty(notes = "Data inicial da data de nascimento do funcionário.", required = false, position = 10)
	private LocalDate startOfBirthDate;
	@ApiModelProperty(notes = "Data final da data de nascimento do funcionário.", required = false, position = 11)
	private LocalDate endOfBirthDate;

	@ApiModelProperty(notes = "Número de telefone do funcionário.", example = "3136457856", required = false, position = 12)
	private String phoneNumber;

	@ApiModelProperty(notes = "Endereço do funcionário.", required = false, position = 13)
	private AddressFilterVO address;

	@ApiModelProperty(notes = "Usuário vinculado ao funcionário.", required = false, position = 14)
	private UserFilterVO user;

	@ApiModelProperty(notes = "Equipe a qual o funcionário é membro.", required = true, position = 15)
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

	}
}
