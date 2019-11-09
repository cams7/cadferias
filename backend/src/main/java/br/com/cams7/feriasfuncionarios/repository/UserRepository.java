/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import static br.com.cams7.feriasfuncionarios.model.UserEntity.WITH_CREATEDBY_LASTMODIFIEDBY;
import static br.com.cams7.feriasfuncionarios.model.UserEntity.WITH_ROLES;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface UserRepository extends UserRepositoryCustom, SoftDeleteCrudRepository<UserEntity, Long> {

	@Override
	@EntityGraph(value = WITH_CREATEDBY_LASTMODIFIEDBY)
	@Query("SELECT u FROM UserEntity u WHERE u.entityId = :id AND u.active = true")
	Optional<UserEntity> findWithAuditById(@Param("id") Long id);

	@EntityGraph(value = WITH_ROLES)
	@Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.active = true")
	Optional<UserEntity> findByEmail(@Param("email") String email);

	@Query("SELECT (COUNT(u) > 0) FROM UserEntity u WHERE u.email = :email AND u.active = true")
	boolean existsByEmail(@Param("email") String email);

	@Query("SELECT (COUNT(u) > 0) FROM UserEntity u WHERE u.entityId != :id AND u.email = :email AND u.active = true")
	boolean existsByEmail(@Param("id") Long id, @Param("email") String email);

	@Query("SELECT e.entityId FROM UserEntity u, EmployeeEntity e WHERE u.entityId=e.user.entityId AND u.entityId = :id AND u.active = true")
	Long findEmployeeIdById(@Param("id") Long id);

}
