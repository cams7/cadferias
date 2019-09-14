/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.vo.filter;

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
@ApiModel(description = "Filtro de busca com os dados da equipe.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class StaffFilterVO extends AuditableFilterVO {

	@ApiModelProperty(notes = "Nome da equipe.", example = "Equipe 1", required = false, position = 4)
	private String name;
}
