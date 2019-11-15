/**
 * 
 */
package br.com.cams7.cadferias.repository.common;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import br.com.cams7.cadferias.model.common.Auditable;
import br.com.cams7.cadferias.model.vo.filter.AuditableFilterVO;

/**
 * @author ceanm
 *
 */
@NoRepositoryBean
public interface SoftDeleteCrudRepository<E extends Auditable<ID>, ID extends Serializable>
		extends CrudRepository<E, ID>, BaseRepository<E, ID, AuditableFilterVO> {

	@Override
	@Query("SELECT e FROM #{#entityName} e WHERE e.active = true")
	Iterable<E> findAll();

	@Override
	@Query("SELECT e FROM #{#entityName} e WHERE e.entityId IN ?1 AND e.active = true")
	Iterable<E> findAllById(Iterable<ID> ids);

	@Override
	@Query("SELECT e FROM #{#entityName} e WHERE e.entityId = ?1 AND e.active = true")
	Optional<E> findById(ID id);
	
	@Query("SELECT e FROM #{#entityName} e WHERE e.entityId = ?1 AND e.active = true")
	Optional<E> findWithAuditById(ID id);

	@Query("SELECT e FROM #{#entityName} e WHERE e.active = false")
	Iterable<E> findInactive();

	@Override
	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.active = true")
	long count();

	@Query("SELECT COUNT(e) FROM #{#entityName} e WHERE e.entityId = ?1 and e.active = true")
	long countById(ID id);

	@Override
	@Query("SELECT (COUNT(e) > 0) FROM #{#entityName} e WHERE e.entityId = ?1 and e.active = true")
	boolean existsById(ID id);

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false WHERE e.entityId = ?1")
	@Modifying(flushAutomatically = true)
	void deleteById(ID id);

	@Override
	default void delete(E entity) {
		ID id = entity.getEntityId();
		deleteById(id);
	}

	@Override
	default void deleteAll(Iterable<? extends E> entities) {
		entities.forEach(entity -> {
			ID id = entity.getEntityId();
			deleteById(id);
		});
	}

	@Query("UPDATE #{#entityName} e SET e.active=false WHERE e.entityId IN ?1")
	@Modifying(flushAutomatically = true)
	void deleteAllById(Iterable<ID> ids);

	@Override
	@Query("UPDATE #{#entityName} e SET e.active=false")
	@Modifying(flushAutomatically = true)
	void deleteAll();

}
