/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import br.com.cams7.feriasfuncionarios.model.RoleEntity;
import br.com.cams7.feriasfuncionarios.model.RoleEntity.RoleName;

/**
 * @author ceanm
 *
 */
public interface RoleService {
	RoleEntity getRoleByName(RoleName roleName);
}
