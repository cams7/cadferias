/**
 * 
 */
package br.com.cams7.cadferias.repository;

import static br.com.cams7.cadferias.model.StaffEntity.WITH_CREATEDBY_LASTMODIFIEDBY;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.cams7.cadferias.model.StaffEntity;
import br.com.cams7.cadferias.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface StaffRepository extends StaffRepositoryCustom, SoftDeleteCrudRepository<StaffEntity, Long> {

	@Override
	@EntityGraph(value = WITH_CREATEDBY_LASTMODIFIEDBY)
	@Query("SELECT s FROM StaffEntity s WHERE s.entityId = :id AND s.active = true")
	Optional<StaffEntity> findWithAuditById(@Param("id") Long id);

}
