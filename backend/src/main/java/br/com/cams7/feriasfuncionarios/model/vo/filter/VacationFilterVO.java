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
@ApiModel(description = "Filtro de busca com os dados da férias.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class VacationFilterVO extends AuditableFilterVO {

	@ApiModelProperty(notes = "Data inicial da data inicial da férias.", required = false, position = 6)
	private LocalDate startOfStartDate;
	@ApiModelProperty(notes = "Data final da data inicial da férias.", required = false, position = 7)
	private LocalDate endOfStartDate;

	@ApiModelProperty(notes = "Data inicial da data final da férias.", required = false, position = 8)
	private LocalDate startOfEndDate;
	@ApiModelProperty(notes = "Data final da data final da férias.", required = false, position = 9)
	private LocalDate endOfEndDate;

	@ApiModelProperty(notes = "Funcionário do qual pertence a férias.", required = false, position = 10)
	private EmployeeFilterVO employee;
}
