/**
 * 
 */
package br.com.cams7.cadferias.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.error.AppResourceNotFoundException;
import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.repository.RoleRepository;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository repository;

	@Transactional(readOnly = true)
	@Override
	public RoleEntity getRoleByName(String name) {
		return repository.findByName(name)
				.orElseThrow(() -> new AppResourceNotFoundException("Role.notFound", name));
	}

}
