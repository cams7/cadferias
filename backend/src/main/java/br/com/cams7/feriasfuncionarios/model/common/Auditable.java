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

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
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
public abstract class Auditable<ID extends Serializable> extends CreationAuditable<ID> {

	@ApiModelProperty(notes = "Usuário que realizou a última alteração na entidade.", required = false, position = 3)
	@JsonView(Views.Detail.class)
	@LastModifiedBy
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "ID_USUARIO_ALTERACAO", nullable = true)
	private UserEntity lastModifiedBy;

	@ApiModelProperty(notes = "Data de alteração da entidade.", required = false, position = 4)
	@JsonView(Views.Detail.class)
	@LastModifiedDate
	@Column(name = "DATA_HORA_ALTERACAO", nullable = true)
	private LocalDateTime lastModifiedDate;

}
