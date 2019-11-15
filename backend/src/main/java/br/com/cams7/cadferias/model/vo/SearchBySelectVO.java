/**
 * 
 */
package br.com.cams7.cadferias.model.vo;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.cams7.cadferias.model.vo.pagination.SortVO;
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
@ApiModel(description = "VO com os parâmetros do filtro de busca do select.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class SearchBySelectVO {

	@ApiModelProperty(notes = "Valor informado durante a pesquisa.", example = "abc", required = true, position = 1)
	@NotBlank
	private String searchValue;

	@ApiModelProperty(notes = "Consulta ordenada pelo campo informado.", required = true, position = 2)
	@Valid
	@NotNull
	private SortVO sort;

	@ApiModelProperty(notes = "Número máximo de elementos que será carregados na consulta.", required = true, position = 3)
	@NotNull
	private Integer size;
}
