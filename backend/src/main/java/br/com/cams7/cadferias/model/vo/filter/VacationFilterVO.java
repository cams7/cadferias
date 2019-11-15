/**
 * 
 */
package br.com.cams7.cadferias.model.vo.filter;

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

	@ApiModelProperty(notes = "Data inicial da férias.", required = false, position = 4)
	private LocalDate[] startDate;

	@ApiModelProperty(notes = "Data final da férias.", required = false, position = 5)
	private LocalDate[] endDate;

	@ApiModelProperty(notes = "Funcionário do qual pertence a férias.", required = false, position = 6)
	private EmployeeFilterVO employee;
}
