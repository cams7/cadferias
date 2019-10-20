/**
 * 
 */
package br.com.cams7.feriasfuncionarios.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import static br.com.cams7.feriasfuncionarios.security.SecurityUtil.getLoggedUser;

/**
 * @author ceanm
 *
 */
public class AuditorAwareImpl implements AuditorAware<UserEntity> {

	@Override
	public Optional<UserEntity> getCurrentAuditor() {
		UserEntity user = getLoggedUser();
		return Optional.of(user);
	}

}
