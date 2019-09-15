/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.StaffFilterVO;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface StaffService extends BaseService<StaffEntity, Long, StaffFilterVO> {

	StaffEntity geOnlyStaffById(Long id);

	Iterable<StaffEntity> getByName(SearchBySelectVO search);
}
