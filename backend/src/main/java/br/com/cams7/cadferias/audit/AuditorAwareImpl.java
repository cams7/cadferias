/**
 * 
 */
package br.com.cams7.cadferias.audit;

import static br.com.cams7.cadferias.security.SecurityUtil.getLoggedUser;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

import br.com.cams7.cadferias.model.UserEntity;

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
