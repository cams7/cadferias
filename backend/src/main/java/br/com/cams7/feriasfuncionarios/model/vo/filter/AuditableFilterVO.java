package br.com.cams7.feriasfuncionarios.model.vo.filter;

import java.time.LocalDate;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public abstract class AuditableFilterVO {
	@ApiModelProperty(notes = "E-mail do usuário que criou a entidade.", required = false, position = 0)
	private String emailOfCreatedBy;
	@ApiModelProperty(notes = "Data inicial da data de criação da entidade.", required = false, position = 1)
	private LocalDate startOfCreatedDate;
	@ApiModelProperty(notes = "Data final da data de criação da entidade.", required = false, position = 2)
	private LocalDate endOfCreatedDate;

	@ApiModelProperty(notes = "E-mail do usuário que realizou a última alteração na entidade.", required = false, position = 3)
	private String emailOfLastModifiedBy;
	@ApiModelProperty(notes = "Data inicial da data da última alteração da entidade.", required = false, position = 4)
	private LocalDate startOfLastModifiedDate;
	@ApiModelProperty(notes = "Data final da data da última alteração da entidade.", required = false, position = 5)
	private LocalDate endOfLastModifiedDate;
}
