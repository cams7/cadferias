/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.common;

import static javax.persistence.FetchType.LAZY;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * @author ceanm
 *
 */
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class CreationAuditable<ID extends Serializable> extends SoftDeleteEntity<ID> {

	@ApiModelProperty(notes = "Usuário que criou a entidade.", required = false, position = 1)
	@JsonView(Views.Detail.class)
	@CreatedBy
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_USUARIO_CRIACAO", nullable = true)
	private UserEntity createdBy;

	@ApiModelProperty(notes = "Data de criação da entidade.", required = false, position = 2)
	@JsonView(Views.Detail.class)
	@CreatedDate
	@Column(name = "DATA_HORA_CRIACAO", nullable = true)
	private LocalDateTime createdDate;
}
