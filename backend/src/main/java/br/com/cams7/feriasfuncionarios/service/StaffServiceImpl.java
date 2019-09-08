/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.StaffFilterVO;
import br.com.cams7.feriasfuncionarios.repository.StaffRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

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
		if (!reporitory.existsById(staffId))
			throw new ResourceNotFoundException(String.format("Nenhuma equipe foi encontrado pelo ID: %d", staffId));

		long employeesTotal = employeeService.countByStaffId(staffId);
		if (employeesTotal > 0)
			throw new InvalidDataException(String.format(
					"A equipe \"%d\" não pode ser removida por que essa tem \"%d\" funcionários cadastrados", staffId,
					employeesTotal));

		super.delete(staffId);
	}

}
