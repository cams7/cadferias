/**
 * 
 */
package br.com.cams7.cadferias.model.vo.pagination;

import static org.apache.commons.collections4.IterableUtils.size;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.cadferias.common.Views.Public;
import br.com.cams7.cadferias.model.common.Auditable;
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
@ApiModel(description = "VO com os parâmetros de saída da paginação.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class PageVO<E extends Auditable<ID>, ID extends Serializable> extends PageInputVO {

	@ApiModelProperty(notes = "Conteúdo da página atual.", required = true, position = 0)
	@JsonView(Public.class)
	private Iterable<E> content;

	@ApiModelProperty(notes = "Total de elementos da página atual.", required = true, position = 1)
	@JsonView(Public.class)
	private Integer numberOfElements;

	@ApiModelProperty(notes = "Número total de páginas.", required = true, position = 2)
	@JsonView(Public.class)
	private Integer totalPages;

	@ApiModelProperty(notes = "É a primeira página.", required = true, position = 3)
	@JsonView(Public.class)
	private Boolean first;

	@ApiModelProperty(notes = "É a última página.", required = true, position = 4)
	@JsonView(Public.class)
	private Boolean last;

	public PageVO(Integer pageNumber, Integer size, Iterable<E> content, Long totalElements, Boolean changedQuery,
			SortVO... sort) {
		super(pageNumber, size, totalElements, changedQuery, sort);

		init(content);
	}

	private void init(Iterable<E> content) {
		setContent(content);

		if (getContent() == null)
			setNumberOfElements(0);
		else
			setNumberOfElements(size(getContent()));

		if (getTotalElements() <= getSize())
			setTotalPages(1);
		else {
			int totalPages = (int) (getTotalElements() / getSize());

			if (getTotalElements() % getSize() == 0)
				setTotalPages(totalPages);
			else
				setTotalPages(totalPages + 1);
		}

		setFirst(getPageNumber() == 0);
		setLast(getPageNumber() == (getTotalPages() - 1));
	}
}
