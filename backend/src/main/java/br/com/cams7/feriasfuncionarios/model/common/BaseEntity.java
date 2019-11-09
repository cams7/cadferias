/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.common;

import java.io.Serializable;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author ceanm
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseEntity<ID extends Serializable> extends ResourceSupport {

	public abstract ID getEntityId();

	public abstract void setEntityId(ID id);
}
