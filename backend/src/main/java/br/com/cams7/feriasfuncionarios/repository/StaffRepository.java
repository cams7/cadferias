/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import static br.com.cams7.feriasfuncionarios.model.StaffEntity.WITH_CREATEDBY_LASTMODIFIEDBY;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface StaffRepository extends StaffRepositoryCustom, SoftDeleteCrudRepository<StaffEntity, Long> {

	@EntityGraph(value = WITH_CREATEDBY_LASTMODIFIEDBY)
	@Query("SELECT s FROM StaffEntity s WHERE s.id = :id AND s.active = true")
	Optional<StaffEntity> findWithAuditById(@Param("id") Long id);

}
