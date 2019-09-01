/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service.common;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
@Transactional
public abstract class BaseServiceImpl<R extends SoftDeleteCrudRepository<E, ID>, E extends Auditable<ID>, ID extends Serializable>
		implements BaseService<E, ID> {

	private static final String ENTITY_NOT_FOUND = "Nenhuma entidade foi encontrada pelo ID: %d";

	@Autowired
	protected R reporitory;

	@Transactional(readOnly = true)
	@Override
	public Iterable<E> getAll() {
		return reporitory.findAll();
	}

	@Transactional(readOnly = true)
	@Override
	public E getById(ID id) {
		return reporitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(String.format(ENTITY_NOT_FOUND, id)));
	}

	@Override
	public E create(E entity) {
		if (entity.getId() != null)
			throw new InvalidDataException("O ID da entidade não pode ser informado durante o cadastro");

		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public E update(E entity) {
		if (entity.getId() == null)
			throw new InvalidDataException("O ID da entidade não foi informado");

		if (!reporitory.existsById(entity.getId()))
			throw new ResourceNotFoundException(String.format(ENTITY_NOT_FOUND, entity.getId()));

		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public void delete(ID id) {
		if (!reporitory.existsById(id))
			throw new ResourceNotFoundException(String.format(ENTITY_NOT_FOUND, id));

		reporitory.deleteById(id);
	}
}
