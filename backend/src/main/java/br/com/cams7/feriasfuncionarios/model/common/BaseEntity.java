/**
 * 
 */
package br.com.cams7.feriasfuncionarios.model.common;

import java.io.Serializable;

/**
 * @author ceanm
 *
 */
public abstract class BaseEntity<ID extends Serializable> {
	
	public abstract ID getId();
	public abstract void setId(ID id);
}
