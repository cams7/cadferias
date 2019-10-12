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
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views.Details;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ceanm
 *
 */
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class Auditable<ID extends Serializable> extends SoftDeleteEntity<ID> {

	@ApiModelProperty(notes = "Usuário que criou a entidade.", required = false, position = 1)
	@JsonView(Details.class)
	@CreatedBy
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_USUARIO_CRIACAO", nullable = true, updatable = false)
	private UserEntity createdBy;

	@ApiModelProperty(notes = "Data de criação da entidade.", required = false, position = 2)
	@JsonView(Details.class)
	@CreatedDate
	@Column(name = "DATA_HORA_CRIACAO", nullable = false, updatable = false)
	private LocalDateTime createdDate;

	@ApiModelProperty(notes = "Usuário que realizou a última alteração na entidade.", required = false, position = 3)
	@JsonView(Details.class)
	@LastModifiedBy
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_USUARIO_ALTERACAO", nullable = true)
	private UserEntity lastModifiedBy;

	@ApiModelProperty(notes = "Data da última alteração da entidade.", required = false, position = 4)
	@JsonView(Details.class)
	@LastModifiedDate
	@Column(name = "DATA_HORA_ALTERACAO", nullable = false)
	private LocalDateTime lastModifiedDate;

}
