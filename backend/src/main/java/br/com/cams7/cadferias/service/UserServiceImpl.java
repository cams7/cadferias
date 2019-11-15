/**
 * 
 */
package br.com.cams7.cadferias.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.common.Validations.EmailRegistered;
import br.com.cams7.cadferias.error.AppResourceNotFoundException;
import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.vo.filter.UserFilterVO;
import br.com.cams7.cadferias.repository.UserRepository;
import br.com.cams7.cadferias.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, Long, UserFilterVO>
		implements UserService {

	private static final String FIELD_EMAIL = "email";

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public UserEntity create(UserEntity user) {
		validateEmail(user);
		addPasswordAndRoles(user);
		return super.create(user);
	}

	@Override
	public UserEntity update(UserEntity user) {
		validateEmail(user);
		addPasswordAndRoles(user);
		return super.update(user);
	}

	private void addPasswordAndRoles(UserEntity user) {
		Set<RoleEntity> roles = user.getRoles();
		if (roles != null && !roles.isEmpty())
			user.setRoles(user.getRoles().stream().map(role -> {
				return roleService.getRoleByName(role.getName());
			}).collect(Collectors.toSet()));
		user.setEncryptedPassword(encoder.encode(user.getPassword()));
	}

	@Override
	public void delete(Long userId) {
		delete(userId, true);
	}

	@Override
	public void delete(Long userId, boolean deleteEmployee) {
		if (deleteEmployee) {
			Long employeeId = reporitory.findEmployeeIdById(userId);
			if (employeeId != null)
				employeeService.delete(employeeId, false);
		}

		super.delete(userId);
	}

	private void validateEmail(UserEntity user) {
		Long userId = user.getEntityId();
		String email = user.getEmail();

		boolean registeredUser = userId != null ? reporitory.existsByEmail(userId, email)
				: reporitory.existsByEmail(email);

		validateField(FIELD_EMAIL, !registeredUser ? email : null, EmailRegistered.class);
	}

	@Transactional(readOnly = true)
	@Override
	public UserEntity getUserByEmail(String email) {
		return reporitory.findByEmail(email)
				.orElseThrow(() -> new AppResourceNotFoundException("User.notFound", email));
	}

}
