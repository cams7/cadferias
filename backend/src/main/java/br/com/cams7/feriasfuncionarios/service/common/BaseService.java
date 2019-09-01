/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service.common;

import java.io.Serializable;

import br.com.cams7.feriasfuncionarios.model.common.Auditable;

/**
 * @author ceanm
 *
 */
public interface BaseService<E extends Auditable<ID>, ID extends Serializable> {

	Iterable<E> getAll();

	E getById(ID id);

	E create(E entity);

	E update(E entity);

	void delete(ID id);
}
