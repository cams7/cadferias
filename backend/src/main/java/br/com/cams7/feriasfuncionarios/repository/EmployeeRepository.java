/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import static br.com.cams7.feriasfuncionarios.model.EmployeeEntity.WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
@Transactional
public interface EmployeeRepository extends EmployeeRepositoryCustom, SoftDeleteCrudRepository<EmployeeEntity, Long> {

	@Override
	@Transactional(readOnly = true)
	@EntityGraph(value = WITH_CREATEDBY_LASTMODIFIEDBY_USER_STAFF)
	@Query("SELECT e FROM EmployeeEntity e WHERE e.id = :id AND e.active = true")
	Optional<EmployeeEntity> findById(@Param("id") Long id);

	@Transactional(readOnly = true)
	@Query("SELECT (COUNT(e) > 0) FROM EmployeeEntity e WHERE e.user.id = :userId AND e.active = true")
	boolean existsByUserId(@Param("userId") Long userId);

	@Query("SELECT e.user.id FROM EmployeeEntity e WHERE e.id = :id AND e.active = true")
	Long findUserIdById(@Param("id") Long id);

	@Query("SELECT e.hiringDate FROM EmployeeEntity e WHERE e.id = :id AND e.active = true")
	LocalDate findHiringDateById(@Param("id") Long id);

	@Query("SELECT e.employeeRegistration FROM EmployeeEntity e WHERE e.id = :id AND e.active = true")
	String findEmployeeRegistrationById(@Param("id") Long id);

	@Transactional(readOnly = true)
	@Query("SELECT COUNT(e) FROM EmployeeEntity e WHERE e.staff.id = :staffId AND e.active = true")
	long countByStaffId(@Param("staffId") Long staffId);

}
