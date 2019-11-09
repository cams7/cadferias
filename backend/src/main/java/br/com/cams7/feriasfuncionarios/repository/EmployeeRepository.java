/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import static br.com.cams7.feriasfuncionarios.model.EmployeeEntity.WITH_USER_STAFF_PHOTOS;
import static br.com.cams7.feriasfuncionarios.model.EmployeeEntity.WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF_PHOTOS;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface EmployeeRepository extends EmployeeRepositoryCustom, SoftDeleteCrudRepository<EmployeeEntity, Long> {

	@Override
	@EntityGraph(value = WITH_USER_STAFF_PHOTOS)
	@Query("SELECT e FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	Optional<EmployeeEntity> findById(@Param("id") Long id);
	
	@Override
	@EntityGraph(value = WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF_PHOTOS)
	@Query("SELECT e FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	Optional<EmployeeEntity> findWithAuditById(@Param("id") Long id);

	@Query("SELECT e FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	Optional<EmployeeEntity> findOnlyEmployeeById(@Param("id") Long id);

	@Query("SELECT (COUNT(e) > 0) FROM EmployeeEntity e WHERE e.user.entityId = :userId AND e.active = true")
	boolean existsByUserId(@Param("userId") Long userId);

	@Query("SELECT e.user.entityId FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	Long findUserIdById(@Param("id") Long id);

	@Query("SELECT e.hiringDate FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	LocalDate findHiringDateById(@Param("id") Long id);

	@Query("SELECT e.employeeRegistration FROM EmployeeEntity e WHERE e.entityId = :id AND e.active = true")
	String findEmployeeRegistrationById(@Param("id") Long id);

	@Query("SELECT COUNT(e) FROM EmployeeEntity e WHERE e.staff.entityId = :staffId AND e.active = true")
	long countByStaffId(@Param("staffId") Long staffId);

}
