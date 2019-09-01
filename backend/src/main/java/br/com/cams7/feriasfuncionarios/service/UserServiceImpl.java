/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.InvalidDataException;
import br.com.cams7.feriasfuncionarios.error.ResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.repository.UserRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, Long> implements UserService {

	@Autowired
	private EmployeeService employeeService;

	@Override
	public UserEntity create(UserEntity user) {

		validateEmail(user);

		return super.create(user);
	}

	@Override
	public UserEntity update(UserEntity user) {
		if (user.getId() == null)
			throw new InvalidDataException("O ID do usuário não foi informado");

		validateEmail(user);

		return super.update(user);
	}

	@Override
	public void delete(Long userId) {
		delete(userId, true);
	}

	@Override
	public void delete(Long userId, boolean deleteEmployee) {
		if (!reporitory.existsById(userId))
			throw new ResourceNotFoundException(String.format("Nenhum usuário foi encontrado pelo ID: %d", userId));

		if (deleteEmployee) {
			Long employeeId = reporitory.findEmployeeIdById(userId);
			employeeService.delete(employeeId, false);
		}

		super.delete(userId);

	}

	private void validateEmail(UserEntity user) {
		Long userId = user.getId();
		String email = user.getEmail();

		boolean registeredUser = userId != null ? reporitory.existsByEmail(userId, email)
				: reporitory.existsByEmail(email);

		if (registeredUser)
			throw new InvalidDataException(String.format("O usuário \"%s\" já foi cadastrado anteriormente", email));

	}

}
