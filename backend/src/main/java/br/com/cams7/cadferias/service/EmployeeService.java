/**
 * 
 */
package br.com.cams7.cadferias.service;

import br.com.cams7.cadferias.model.EmployeeEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.cadferias.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface EmployeeService extends BaseService<EmployeeEntity, Long, EmployeeFilterVO> {

	void delete(Long employeeId, boolean deleteUser);
	
	long countByStaffId(Long staffId);
	
	EmployeeEntity geOnlyEmployeeById(Long id);

	Iterable<EmployeeEntity> getByName(SearchBySelectVO search);

}
