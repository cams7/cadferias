/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.model.VacationEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.VacationFilterVO;
import br.com.cams7.feriasfuncionarios.repository.VacationRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class VacationServiceImpl extends BaseServiceImpl<VacationRepository, VacationEntity, Long, VacationFilterVO>
		implements VacationService {

	@Transactional(readOnly = true)
	@Override
	public Long[] getIdsByEmployeeId(Long employeeId) {
		return reporitory.findIdsByEmployeeId(employeeId);
	}

}
