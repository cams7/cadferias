/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.VacationEntity;
import br.com.cams7.feriasfuncionarios.repository.VacationRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class VacationServiceImpl extends BaseServiceImpl<VacationRepository, VacationEntity, Long>
		implements VacationService {

	@Autowired
	private EmployeeService employeeService;

	@Override
	public VacationEntity create(VacationEntity vacation) {
		validateEmployeeId(vacation);

		return super.create(vacation);
	}

	@Override
	public VacationEntity update(VacationEntity vacation) {
		Long vacationId = vacation.getId();

		if (vacationId == null)
			throw new InvalidDataException("O ID da férias não foi informado");

		Long employeeId = reporitory.findEmployeeIdById(vacationId);
		vacation.setEmployee(new EmployeeEntity(employeeId));

		return super.update(vacation);
	}

	@Override
	public void delete(Long vacationId) {
		if (!reporitory.existsById(vacationId))
			throw new ResourceNotFoundException(String.format("Nenhuma férias foi encontrado pelo ID: %d", vacationId));

		super.delete(vacationId);
	}

	private void validateEmployeeId(VacationEntity vacation) {
		Long employeeId = vacation.getEmployee().getId();

		if (employeeId == null)
			throw new InvalidDataException("O ID do funcionário não foi informado");

		if (!employeeService.existsById(employeeId))
			throw new ResourceNotFoundException(String.format("O funcionário \"%d\" não esta cadastrado", employeeId));
	}

	@Transactional(readOnly = true)
	@Override
	public Long[] getIdsByEmployeeId(Long employeeId) {
		return reporitory.findIdsByEmployeeId(employeeId);
	}

}
