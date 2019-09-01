/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
public interface EmployeeRepository extends EmployeeRepositoryCustom, SoftDeleteCrudRepository<EmployeeEntity, Long> {

}
