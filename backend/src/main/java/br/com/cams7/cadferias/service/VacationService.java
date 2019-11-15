/**
 * 
 */
package br.com.cams7.cadferias.service;

import br.com.cams7.cadferias.model.VacationEntity;
import br.com.cams7.cadferias.model.vo.filter.VacationFilterVO;
import br.com.cams7.cadferias.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface VacationService extends BaseService<VacationEntity, Long, VacationFilterVO> {

	Long[] getIdsByEmployeeId(Long employeeId);

}
