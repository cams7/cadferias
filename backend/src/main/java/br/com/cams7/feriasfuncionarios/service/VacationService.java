/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.VacationEntity;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface VacationService extends BaseService<VacationEntity, Long> {

	Long[] getIdsByEmployeeId(Long employeeId);

}
