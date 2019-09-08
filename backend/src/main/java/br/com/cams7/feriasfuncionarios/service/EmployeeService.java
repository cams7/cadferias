/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface EmployeeService extends BaseService<EmployeeEntity, Long, EmployeeFilterVO> {

	void delete(Long employeeId, boolean deleteUser);
	
	long countByStaffId(Long staffId);

}
