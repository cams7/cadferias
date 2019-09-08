/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.vo.pagination;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views;
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
@ApiModel(description = "VO com os parâmetros da ordernação.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class SortVO {

	@ApiModelProperty(notes = "Nome do campo ordernado.", required = true, position = 0)
	@JsonView(Views.Public.class)
	@NotBlank
	private String property;

	@ApiModelProperty(notes = "Ordenação Acendente, Descendente ou Não informado.", required = true, position = 1)
	@JsonView(Views.Public.class)
	@NotNull
	private Direction direction;

	public static enum Direction {
		ASC, DESC, UNINFORMED
	}
}
