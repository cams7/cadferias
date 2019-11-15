/**
 * 
 */
package br.com.cams7.cadferias.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.error.AppInvalidDataException;
import br.com.cams7.cadferias.model.StaffEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.filter.StaffFilterVO;
import br.com.cams7.cadferias.repository.StaffRepository;
import br.com.cams7.cadferias.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class StaffServiceImpl extends BaseServiceImpl<StaffRepository, StaffEntity, Long, StaffFilterVO>
		implements StaffService {

	@Autowired
	private EmployeeService employeeService;

	@Override
	public void delete(Long staffId) {
		long employeesTotal = employeeService.countByStaffId(staffId);
		if (employeesTotal > 0)
			throw new AppInvalidDataException("Staff.haveEmployees", staffId, employeesTotal);

		super.delete(staffId);
	}

	@Transactional(readOnly = true)
	@Override
	public Iterable<StaffEntity> getByName(SearchBySelectVO search) {
		return reporitory.findByName(search);
	}

}
