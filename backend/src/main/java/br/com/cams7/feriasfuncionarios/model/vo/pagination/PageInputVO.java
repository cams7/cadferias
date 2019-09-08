package br.com.cams7.feriasfuncionarios.model.vo.pagination;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(description = "VO com os parâmetros de entrada da paginação.")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class PageInputVO {

	public static final int DEFAULT_SIZE = 10;

	@ApiModelProperty(notes = "Número da página atual.", required = true, position = 0)
	@JsonView(Views.Public.class)
	@NotNull
	private Integer pageNumber;

	@ApiModelProperty(notes = "Número máximo de elementos que será exibidos na página atual.", required = true, position = 1)
	@JsonView(Views.Public.class)
	@NotNull
	private Integer size;

	@ApiModelProperty(notes = "Número de elementos retornados após a consulta.", required = true, position = 2)
	@JsonView(Views.Public.class)
	@NotNull
	private Long totalElements;

	@ApiModelProperty(notes = "O filtro da consulta foi alterado.", required = true, position = 3)
	@JsonView(Views.Public.class)
	@NotNull
	private Boolean changedQuery;

	@ApiModelProperty(notes = "Consulta ordenada pelos campos informados.", required = true, position = 4)
	@JsonView(Views.Public.class)
	@Valid
	@NotNull
	@Size(min = 1)
	private SortVO[] sort;

	private PageInputVO(int pageNumber, int size, SortVO... sort) {
		this();

		setPageNumber(pageNumber);
		setSize(size);
		setSort(sort);
	}

	public PageInputVO(int pageNumber, int size, long totalElements, boolean changedQuery, SortVO... sort) {
		this(pageNumber, size, sort);

		setTotalElements(totalElements);
		setChangedQuery(changedQuery);
	}
}
