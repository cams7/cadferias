/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.AppFieldErrorException;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.UserFilterVO;
import br.com.cams7.feriasfuncionarios.repository.UserRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, Long, UserFilterVO>
		implements UserService {

	@Autowired
	private EmployeeService employeeService;

	@Override
	public UserEntity create(String prefix, UserEntity user) {

		validateEmail(prefix, user);

		return super.create(user);
	}

	@Override
	public UserEntity update(String prefix, UserEntity user) {
		validateEmail(prefix, user);

		return super.update(user);
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

	private void validateEmail(String prefix, UserEntity user) {
		Long userId = user.getId();
		String email = user.getEmail();

		boolean registeredUser = userId != null ? reporitory.existsByEmail(userId, email)
				: reporitory.existsByEmail(email);

		if (registeredUser)
			throw new AppFieldErrorException(prefix, getFieldError("email", email, "User.emailRegistered", email));

	}

}
