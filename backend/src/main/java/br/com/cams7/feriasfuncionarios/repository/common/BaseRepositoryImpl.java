/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository.common;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * @author ceanm
 *
 */
public abstract class BaseRepositoryImpl {

	@PersistenceContext
	protected EntityManager em;

}
