/**
 * 
 */
package br.com.cams7.cadferias.service;

import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.vo.filter.UserFilterVO;
import br.com.cams7.cadferias.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface UserService extends BaseService<UserEntity, Long, UserFilterVO> {

	void delete(Long userId, boolean deleteEmployee);
	
	UserEntity getUserByEmail(String email);
}
