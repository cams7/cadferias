/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service.common;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.CreationAuditableVO;
import br.com.cams7.feriasfuncionarios.model.vo.SearchVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.AuditableFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageVO;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
@Transactional
public abstract class BaseServiceImpl<R extends SoftDeleteCrudRepository<E, ID>, E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		implements BaseService<E, ID, F> {

	private static final String ENTITY_NOT_FOUND = "Nenhuma entidade foi encontrada pelo ID: %d";

	@Autowired
	protected R reporitory;

//	@Transactional(readOnly = true)
//	@Override
//	public Iterable<E> getAll() {
//		return reporitory.findAll();
//	}

	@Transactional(readOnly = true)
	@Override
	public E getById(ID id) {
		return reporitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(String.format(ENTITY_NOT_FOUND, id)));
	}

	@Transactional(readOnly = true)
	@Override
	public boolean existsById(ID id) {
		return reporitory.existsById(id);
	}

	@Override
	public E create(E entity) {
		entity.setId(null);
		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public E update(E entity) {
		ID id = entity.getId();

		if (id == null)
			throw new InvalidDataException("O ID da entidade não foi informado");

		CreationAuditableVO auditable = reporitory.findCreationAuditableById(id);

		entity.setActive(true);
		entity.setCreatedBy(new UserEntity(auditable.getCreatedBy()));
		entity.setCreatedDate(auditable.getCreatedDate());

		return reporitory.save(entity);
	}

	@Override
	public void delete(ID id) {
//		if (!existsById(id))
//			throw new ResourceNotFoundException(String.format(ENTITY_NOT_FOUND, id));

		reporitory.deleteById(id);
	}

	@Override
	public void deleteAllById(Iterable<ID> ids) {
		reporitory.deleteAllById(ids);
	}

	@Transactional(readOnly = true)
	@Override
	public PageVO<E, ID> getBySearch(SearchVO<F> search) {
		@SuppressWarnings("unchecked")
		PageVO<E, ID> page = reporitory.findBySearch((SearchVO<AuditableFilterVO>) search);
		return page;
	}

}
