/**
 * 
 */
package br.com.cams7.cadferias.service;

import br.com.cams7.cadferias.model.StaffEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.filter.StaffFilterVO;
import br.com.cams7.cadferias.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface StaffService extends BaseService<StaffEntity, Long, StaffFilterVO> {

	Iterable<StaffEntity> getByName(SearchBySelectVO search);
}
