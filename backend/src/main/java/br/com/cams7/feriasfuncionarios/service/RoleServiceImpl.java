/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.AppResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.RoleEntity;
import br.com.cams7.feriasfuncionarios.model.RoleEntity.RoleName;
import br.com.cams7.feriasfuncionarios.repository.RoleRepository;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;

	@Transactional(readOnly = true)
	@Override
	public RoleEntity getRoleByName(RoleName roleName) {
		return roleRepository.findByName(roleName)
				.orElseThrow(() -> new AppResourceNotFoundException("Role.notFound", roleName.name()));
	}

}
