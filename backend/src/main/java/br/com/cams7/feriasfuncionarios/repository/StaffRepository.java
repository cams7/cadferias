/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface StaffRepository extends StaffRepositoryCustom, SoftDeleteCrudRepository<StaffEntity, Long> {

}
