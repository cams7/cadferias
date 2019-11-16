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
	
	EmployeeEntity getByIdWithoutPhotos(Long employeeId);

	void delete(Long employeeId, boolean deleteUser);
	
	long countByStaffId(Long staffId);
	
	Iterable<EmployeeEntity> getByName(SearchBySelectVO search);

}
