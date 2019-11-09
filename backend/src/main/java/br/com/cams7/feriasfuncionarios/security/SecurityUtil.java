/**
 * 
 */
package br.com.cams7.feriasfuncionarios.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import br.com.cams7.feriasfuncionarios.model.UserEntity;

/**
 * @author ceanm
 *
 */
public final class SecurityUtil {
	public static final UserEntity getLoggedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null)
			return null;

		if (!(authentication.getPrincipal() instanceof UserEntity)) {
			UserEntity user = new UserEntity();
			user.setEntityId(1l);
			return user;
		}

		UserEntity user = (UserEntity) authentication.getPrincipal();
		return user;
	}
}
