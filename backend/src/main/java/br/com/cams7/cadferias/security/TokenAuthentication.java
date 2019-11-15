/**
 * 
 */
package br.com.cams7.cadferias.security;

import static br.com.cams7.cadferias.common.Utils.getTimestamp;
import static br.com.cams7.cadferias.error.vo.MessageVO.MessageType.WARNING;
import static br.com.cams7.cadferias.security.SecurityConstants.EXPIRATION_TIME;
import static br.com.cams7.cadferias.security.SecurityConstants.HEADER_STRING;
import static br.com.cams7.cadferias.security.SecurityConstants.JWT_SUBJECT;
import static br.com.cams7.cadferias.security.SecurityConstants.SECRET;
import static br.com.cams7.cadferias.security.SecurityConstants.TOKEN_PREFIX;
import static br.com.cams7.cadferias.security.SecurityConstants.USER_EMAIL;
import static br.com.cams7.cadferias.security.SecurityConstants.USER_ID;
import static br.com.cams7.cadferias.security.SecurityConstants.USER_ROLES;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static javax.servlet.http.HttpServletResponse.SC_OK;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.MessageSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.cams7.cadferias.common.Utils;
import br.com.cams7.cadferias.error.vo.ErrorVO;
import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.RoleEntity.RoleName;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author ceanm
 *
 */
public class TokenAuthentication {

	private final static String DELIMITER = ",";
	private final static String CONTENT_TYPE = "application/json";
	private final static String CHARACTER_ENCODING = "UTF-8";

	public static void addAuthentication(HttpServletResponse response, UserEntity user) throws IOException {
		String roles = user.getRoles().stream().map(role -> role.getName().name())
				.collect(Collectors.joining(DELIMITER));
		// @formatter:off		
		String token = Jwts.builder()
				.setSubject(JWT_SUBJECT)
				.claim(USER_ID, user.getEntityId())
				.claim(USER_EMAIL, user.getEmail())
				.claim(USER_ROLES, roles)
				.setExpiration(new Date(getTimestamp() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();
		// @formatter:on
		final String BEARER_TOKER = TOKEN_PREFIX + " " + token;

		response.setStatus(SC_OK);
		response.setContentType(CONTENT_TYPE);
		response.setCharacterEncoding(CHARACTER_ENCODING);
		response.getWriter().write(String.format("{\"token\":\"%s\"}", BEARER_TOKER));
	}

	public static Authentication getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);

		if (token == null || !token.startsWith(TOKEN_PREFIX))
			return null;

		Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody();

		String subject = claims.getSubject();
		UserEntity user = new UserEntity();
		user.setEntityId(((Integer) claims.get(USER_ID)).longValue());
		user.setEmail((String) claims.get(USER_EMAIL));

		Set<RoleEntity> roles = Arrays.asList(((String) claims.get(USER_ROLES)).split(DELIMITER)).stream()
				.map(roleName -> {
					RoleEntity role = new RoleEntity();
					role.setName(RoleName.valueOf(roleName));
					return role;
				}).collect(Collectors.toSet());

		user.setRoles(roles);

		if (subject == null || !JWT_SUBJECT.equals(subject))
			return null;

		Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
				LoggedUser.getAuthorities(user));
		return authentication;
	}

	public static void showErrorMessage(HttpServletResponse response, RuntimeException exception,
			MessageSource messageSource, String codeMessage) throws IOException {

		String message = Utils.getMessage(messageSource, codeMessage);

		// @formatter:off
		ErrorVO details = ErrorVO.builder()
				.type(WARNING)
				.title(Utils.getMessage(messageSource, "unauthorized"))
				.codeMessage(codeMessage)
				.message(message)				
				.timestamp(getTimestamp())
				.status(SC_UNAUTHORIZED)
				.error("UNAUTHORIZED")
				.exception(exception.getClass().getName())
				.exceptionMessage(message)
				.path(null)
				.build();
		//@formatter:on

		response.setStatus(SC_UNAUTHORIZED);
		response.setContentType(CONTENT_TYPE);
		response.setCharacterEncoding(CHARACTER_ENCODING);
		response.getWriter().write(new ObjectMapper().writeValueAsString(details));
	}

}
