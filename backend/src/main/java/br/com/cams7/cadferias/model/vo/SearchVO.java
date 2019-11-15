/**
 * 
 */
package br.com.cams7.cadferias.model.vo;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import br.com.cams7.cadferias.model.vo.filter.AuditableFilterVO;
import br.com.cams7.cadferias.model.vo.pagination.PageInputVO;
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
@ApiModel(description = "VO com os parâmetros do filtro de busca e da paginação.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class SearchVO<F extends AuditableFilterVO> {

	@ApiModelProperty(notes = "Filtro utilizado na busca.", required = true, position = 0)
	private F searchFilter;

	@ApiModelProperty(notes = "Parâmetros da paginação.", required = true, position = 1)
	@Valid
	@NotNull
	private PageInputVO pageInput;
	
	private boolean globalFilter;

}
