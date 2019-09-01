/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface UserRepository extends UserRepositoryCustom, SoftDeleteCrudRepository<UserEntity, Long> {

}
