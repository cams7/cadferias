package br.com.cams7.cadferias.model.vo.filter;

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
	
	@ApiModelProperty(notes = "Data de criação da entidade.", required = false, position = 1)
	private LocalDate[] createdDate;

	@ApiModelProperty(notes = "E-mail do usuário que realizou a última alteração na entidade.", required = false, position = 2)
	private String emailOfLastModifiedBy;
	
	@ApiModelProperty(notes = "Data da última alteração da entidade.", required = false, position = 3)
	private LocalDate[] lastModifiedDate;
}
