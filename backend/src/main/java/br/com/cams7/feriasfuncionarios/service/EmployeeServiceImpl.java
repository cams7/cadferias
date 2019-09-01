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
import br.com.cams7.feriasfuncionarios.repository.EmployeeRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl extends BaseServiceImpl<EmployeeRepository, EmployeeEntity, Long>
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

		validateUserId(employee);
		validateStaffId(employee);

		Long userId = employee.getUser().getId();

		if (reporitory.existsByUserId(userId))
			throw new InvalidDataException(
					String.format("O ID do usuário \"%d\" já está relacionado a outro funcionário", userId));

		final String EMPLOYEE_REGISTRATION = RandomStringUtils.randomAlphanumeric(20).toUpperCase();
		employee.setEmployeeRegistration(EMPLOYEE_REGISTRATION);

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
		vacationService.deleteAllById(Arrays.asList(vacationIds));

		super.delete(employeeId);

	}

	private void validateUserId(EmployeeEntity employee) {
		Long userId = employee.getUser().getId();

		if (userId == null)
			throw new InvalidDataException("O ID do usuário não foi informado");

		if (!userService.existsById(userId))
			throw new ResourceNotFoundException(String.format("O usuário \"%d\" não esta cadastrado", userId));
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

}
