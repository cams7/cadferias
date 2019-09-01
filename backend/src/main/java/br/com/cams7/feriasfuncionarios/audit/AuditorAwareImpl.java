/**
 * 
 */
package br.com.cams7.feriasfuncionarios.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

import br.com.cams7.feriasfuncionarios.model.UserEntity;

/**
 * @author ceanm
 *
 */
public class AuditorAwareImpl implements AuditorAware<UserEntity> {

	@Override
	public Optional<UserEntity> getCurrentAuditor() {
		UserEntity user = new UserEntity();
		user.setId(1l);
		return Optional.of(user);
	}

}
