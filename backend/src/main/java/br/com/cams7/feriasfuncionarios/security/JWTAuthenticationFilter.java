package br.com.cams7.feriasfuncionarios.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.cams7.feriasfuncionarios.model.UserEntity;

/**
 * @author ceanm
 *
 */
public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
	
	public JWTAuthenticationFilter(String signInUrl, AuthenticationManager authenticationManager) {
		super(new AntPathRequestMatcher(signInUrl));
		setAuthenticationManager(authenticationManager);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, JsonParseException, JsonMappingException, IOException {
		UserEntity user = new ObjectMapper().readValue(request.getInputStream(), UserEntity.class);

		return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),
				user.getPassword(), Collections.emptyList()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		LoggedUser loggedUser = (LoggedUser) authResult.getPrincipal();
		UserEntity user = loggedUser.getUser();

		TokenAuthentication.addAuthentication(response, user);
	}


}
