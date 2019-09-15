/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import java.time.LocalDate;
import java.util.Arrays;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
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

	@Autowired
	private UserService userService;

	@Autowired
	private StaffService staffService;

	@Autowired
	private VacationService vacationService;

	@Override
	public EmployeeEntity create(EmployeeEntity employee) {
		if (employee.getHiringDate() == null)
			throw new InvalidDataException("A data de contratação não foi informada");

		validateStaffId(employee);

		final String EMPLOYEE_REGISTRATION = RandomStringUtils.randomAlphanumeric(20).toUpperCase();
		employee.setEmployeeRegistration(EMPLOYEE_REGISTRATION);

		UserEntity user = employee.getUser();
		user.setPassword("12345");
		user = userService.create(user);
		employee.setUser(user);

		return super.create(employee);
	}

	@Override
	public EmployeeEntity update(EmployeeEntity employee) {
		Long employeeId = employee.getId();

		if (employeeId == null)
			throw new InvalidDataException("O ID do funcionário não foi informado");

		validateStaffId(employee);

		Long userId = reporitory.findUserIdById(employeeId);
		employee.setUser(new UserEntity(userId));

		String employeeRegistration = reporitory.findEmployeeRegistrationById(employeeId);
		employee.setEmployeeRegistration(employeeRegistration);

		LocalDate hiringDate = reporitory.findHiringDateById(employeeId);
		employee.setHiringDate(hiringDate);

		return super.update(employee);
	}

	@Override
	public void delete(Long employeeId) {
		delete(employeeId, true);
	}

	@Override
	public void delete(Long employeeId, boolean deleteUser) {
		if (!reporitory.existsById(employeeId))
			throw new ResourceNotFoundException(
					String.format("Nenhum funcionário foi encontrado pelo ID: %d", employeeId));

		if (deleteUser) {
			Long userId = reporitory.findUserIdById(employeeId);
			userService.delete(userId, false);
		}

		Long[] vacationIds = vacationService.getIdsByEmployeeId(employeeId);
		if (vacationIds.length > 0)
			vacationService.deleteAllById(Arrays.asList(vacationIds));

		super.delete(employeeId);

	}

	private void validateStaffId(EmployeeEntity employee) {
		Long staffId = employee.getStaff().getId();

		if (staffId == null)
			throw new InvalidDataException("O ID da equipe não foi informado");

		if (!staffService.existsById(staffId))
			throw new ResourceNotFoundException(String.format("A equipe \"%d\" não esta cadastrada", staffId));
	}

	@Transactional(readOnly = true)
	@Override
	public long countByStaffId(Long staffId) {
		return reporitory.countByStaffId(staffId);
	}

	@Transactional(readOnly = true)
	@Override
	public EmployeeEntity geOnlyEmployeeById(Long id) {
		return reporitory.findOnlyEmployeeById(id).orElseThrow(() -> new ResourceNotFoundException(
				String.format("Nenhum funcionário foi encontrada pelo ID: %d", id)));
	}

	@Transactional(readOnly = true)
	@Override
	public Iterable<EmployeeEntity> getByName(SearchBySelectVO search) {
		return reporitory.findByName(search);
	}

}
