/**
 * 
 */
package br.com.cams7.cadferias.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.cams7.cadferias.error.AppResourceNotFoundException;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.security.LoggedUser;

/**
 * @author ceanm
 *
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			UserEntity user = userService.getUserByEmail(username);
			return new LoggedUser(user);
		} catch (AppResourceNotFoundException e) {
			throw new UsernameNotFoundException(e.getMessage());
		}
	}

}
