/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import java.util.Arrays;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.AppResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.feriasfuncionarios.repository.EmployeeRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl extends BaseServiceImpl<EmployeeRepository, EmployeeEntity, Long, EmployeeFilterVO>
		implements EmployeeService {
	
	private static final String EMPLOYEE_PREFIX = "employee.";

	@Autowired
	private UserService userService;

	@Autowired
	private VacationService vacationService;

	@Override
	public EmployeeEntity create(EmployeeEntity employee) {
		UserEntity user = employee.getUser();

		userService.checkViolations(EMPLOYEE_PREFIX, user);

		user.setPassword("12345");
		employee.setUser(userService.create(EMPLOYEE_PREFIX, user));

		final String EMPLOYEE_REGISTRATION = RandomStringUtils.randomAlphanumeric(20).toUpperCase();
		employee.setEmployeeRegistration(EMPLOYEE_REGISTRATION);

		return super.create(employee);
	}

	@Override
	public void delete(Long employeeId) {
		delete(employeeId, true);
	}

	@Override
	public void delete(Long employeeId, boolean deleteUser) {
		if (deleteUser) {
			Long userId = reporitory.findUserIdById(employeeId);
			if (userId != null)
				userService.delete(userId, false);
		}

		Long[] vacationIds = vacationService.getIdsByEmployeeId(employeeId);
		if (vacationIds.length > 0)
			vacationService.deleteAllById(Arrays.asList(vacationIds));

		super.delete(employeeId);

	}

	@Transactional(readOnly = true)
	@Override
	public long countByStaffId(Long staffId) {
		return reporitory.countByStaffId(staffId);
	}

	@Transactional(readOnly = true)
	@Override
	public EmployeeEntity geOnlyEmployeeById(Long id) {

		return reporitory.findOnlyEmployeeById(id).orElseThrow(() -> {
			return new AppResourceNotFoundException("Employee.notFound", id);
		});
	}

	@Transactional(readOnly = true)
	@Override
	public Iterable<EmployeeEntity> getByName(SearchBySelectVO search) {
		return reporitory.findByName(search);
	}

}
