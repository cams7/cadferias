package br.com.cams7.cadferias.security;

import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.model.UserEntity;
import lombok.Getter;

/**
 * @author ceanm
 *
 */
@SuppressWarnings("serial")
public final class LoggedUser extends User {

	@Getter
	private UserEntity user;

	public LoggedUser(UserEntity user) {
		super(user.getEmail(), user.getEncryptedPassword(), getAuthorities(user));
		this.user = user;
	}

	public LoggedUser(UserEntity user, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked) {
		super(user.getEmail(), user.getEncryptedPassword(), enabled, accountNonExpired, credentialsNonExpired,
				accountNonLocked, getAuthorities(user));
		this.user = user;
	}

	public static final List<GrantedAuthority> getAuthorities(UserEntity user) {
		Set<RoleEntity> roles = user.getRoles();
		if (roles == null || roles.isEmpty())
			return AuthorityUtils.createAuthorityList();

		List<GrantedAuthority> authorities = AuthorityUtils
				.createAuthorityList(roles.stream().map(role -> role.getName().name()).toArray(String[]::new));
		return authorities;
	}

}
