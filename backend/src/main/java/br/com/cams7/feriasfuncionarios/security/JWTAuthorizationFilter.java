package br.com.cams7.feriasfuncionarios.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/**
 * @author ceanm
 *
 */
public class JWTAuthorizationFilter extends GenericFilterBean {

	private MessageSource messageSource;

	public JWTAuthorizationFilter(MessageSource messageSource) {
		super();
		this.messageSource = messageSource;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {

		try {
			Authentication authentication = TokenAuthentication.getAuthentication((HttpServletRequest) request);

			SecurityContextHolder.getContext().setAuthentication(authentication);
			filterChain.doFilter(request, response);
		} catch (SignatureException e) {
			TokenAuthentication.showErrorMessage((HttpServletResponse) response, e, messageSource,
					"authorizationInvalidJWTSignature");
		} catch (MalformedJwtException e) {
			TokenAuthentication.showErrorMessage((HttpServletResponse) response, e, messageSource,
					"authorizationInvalidJWTToken");
		} catch (ExpiredJwtException e) {
			TokenAuthentication.showErrorMessage((HttpServletResponse) response, e, messageSource,
					"authorizationExpiredJWTToken");
		} catch (UnsupportedJwtException e) {
			TokenAuthentication.showErrorMessage((HttpServletResponse) response, e, messageSource,
					"authorizationUnsupportedJWTToken");
		} catch (IllegalArgumentException e) {
			TokenAuthentication.showErrorMessage((HttpServletResponse) response, e, messageSource,
					"authorizationJWTClaimsStringEmpty");
		}
	}

}
