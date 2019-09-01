/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;

/**
 * @author ceanm
 *
 */
public interface UserService extends BaseService<UserEntity, Long> {

	void delete(Long userId, boolean deleteEmployee);
}
