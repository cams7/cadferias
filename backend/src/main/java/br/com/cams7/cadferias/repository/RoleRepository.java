/**
 * 
 */
package br.com.cams7.cadferias.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.cams7.cadferias.model.RoleEntity;

/**
 * @author ceanm
 *
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
	Optional<RoleEntity> findByName(String name);
}
