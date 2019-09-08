/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.UserFilterVO;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface UserService extends BaseService<UserEntity, Long, UserFilterVO> {

	void delete(Long userId, boolean deleteEmployee);
}
