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
@ApiModel(description = "Filtro de busca com os dados do usuário.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserFilterVO extends AuditableFilterVO {
	
	@ApiModelProperty(notes = "E-mail do usuário.", example = "usuario@teste.com", required = false, position = 6)
	private String email;

}
