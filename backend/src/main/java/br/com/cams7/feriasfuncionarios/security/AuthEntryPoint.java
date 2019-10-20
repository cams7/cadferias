/**
 * 
 */
package br.com.cams7.feriasfuncionarios.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * @author ceanm
 *
 */
@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {

	@Autowired
	private MessageSource messageSource;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		TokenAuthentication.showErrorMessage(response, authException, messageSource, "unauthorized");
	}

}
