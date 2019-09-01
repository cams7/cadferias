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

import br.com.cams7.feriasfuncionarios.model.common.SoftDeleteEntity;

/**
 * @author ceanm
 *
 */
@Transactional
@NoRepositoryBean
public interface SoftDeleteCrudRepository<E extends SoftDeleteEntity<ID>, ID extends Serializable>
		extends CrudRepository<E, ID> {

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.active = true")
	Iterable<E> findAll();

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.id in ?1 and e.active = true")
	Iterable<E> findAllById(Iterable<ID> ids);

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT e FROM #{#entityName} e WHERE e.id = ?1 and e.active = true")
	Optional<E> findById(ID id);

	@Query("SELECT e FROM #{#entityName} e WHERE e.active = false")
	@Transactional(readOnly = true)
	Iterable<E> findInactive();

	@Override
	@Transactional(readOnly = true)
	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.active = true")
	long count();
	
	@Transactional(readOnly = true)
	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.id = ?1 and e.active = true")
	long countById(ID id);

	@Override
	@Transactional(readOnly = true)
	default boolean existsById(ID id) {		
		return countById(id) > 0l;
	}

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false WHERE e.id = ?1")
	@Modifying
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

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false")
	@Modifying
	void deleteAll();

}
