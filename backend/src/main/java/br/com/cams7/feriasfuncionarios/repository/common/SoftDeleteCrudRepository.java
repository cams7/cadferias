/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository.common;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.CreationAuditableVO;

/**
 * @author ceanm
 *
 */
@Transactional
@NoRepositoryBean
public interface SoftDeleteCrudRepository<E extends Auditable<ID>, ID extends Serializable>
		extends CrudRepository<E, ID> {

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.active = true")
	Iterable<E> findAll();

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.id IN ?1 AND e.active = true")
	Iterable<E> findAllById(Iterable<ID> ids);

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.id = ?1 AND e.active = true")
	Optional<E> findById(ID id);

	@Query("SELECT e FROM #{#entityName} e WHERE e.active = false")
	@Transactional(readOnly = true)
	Iterable<E> findInactive();

	@Transactional(readOnly = true)
	@Query("SELECT new br.com.cams7.feriasfuncionarios.model.vo.CreationAuditableVO(e.createdBy.id, e.createdDate) FROM #{#entityName} e WHERE e.id = ?1 and e.active = true")
	CreationAuditableVO findCreationAuditableById(ID id);

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.active = true")
	long count();

	@Transactional(readOnly = true)
	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.id = ?1 and e.active = true")
	long countById(ID id);

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT (COUNT(e) > 0) FROM #{#entityName} e WHERE e.id = ?1 and e.active = true")
	boolean existsById(ID id);

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false WHERE e.id = ?1")
	@Modifying(flushAutomatically = true)
	void deleteById(ID id);

	@Override
	default void delete(E entity) {
		ID id = entity.getId();
		deleteById(id);
	}

	@Override
	default void deleteAll(Iterable<? extends E> entities) {
		entities.forEach(entity -> {
			ID id = entity.getId();
			deleteById(id);
		});
	}

	@Query("UPDATE #{#entityName} e SET e.active=false WHERE e.id IN ?1")
	@Modifying(flushAutomatically = true)
	void deleteAllById(Iterable<ID> ids);

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false")
	@Modifying(flushAutomatically = true)
	void deleteAll();

}
