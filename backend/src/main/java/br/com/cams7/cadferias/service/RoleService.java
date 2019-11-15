/**
 * 
 */
package br.com.cams7.cadferias.service;

import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.model.RoleEntity.RoleName;

/**
 * @author ceanm
 *
 */
public interface RoleService {
	RoleEntity getRoleByName(RoleName roleName);
}
