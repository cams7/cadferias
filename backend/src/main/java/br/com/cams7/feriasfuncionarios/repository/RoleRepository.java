/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.cams7.feriasfuncionarios.model.RoleEntity;
import br.com.cams7.feriasfuncionarios.model.RoleEntity.RoleName;

/**
 * @author ceanm
 *
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
	Optional<RoleEntity> findByName(RoleName roleName);
}
