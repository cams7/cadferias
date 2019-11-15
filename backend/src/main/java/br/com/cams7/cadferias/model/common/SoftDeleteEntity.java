/**
 * 
 */
package br.com.cams7.cadferias.model.common;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * @author ceanm
 *
 */
@Getter
@Setter
@MappedSuperclass
public abstract class SoftDeleteEntity<ID extends Serializable> extends BaseEntity<ID> {

	@ApiModelProperty(notes = "A entidade esta ativa.", required = false, position = 0)
	@JsonIgnore
	@Column(name = "ATIVO", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
	private boolean active = true;

}
