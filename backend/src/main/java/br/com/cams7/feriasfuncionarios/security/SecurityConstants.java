/**
 * 
 */
package br.com.cams7.feriasfuncionarios.security;

/**
 * @author ceanm
 *
 */
public final class SecurityConstants {

	// Authorization Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ
	public static final String SECRET = "FeriasFuncionariosSecretKey";
	public static final String TOKEN_PREFIX = "Bearer";
	public static final String HEADER_STRING = "Authorization";
	public static final long EXPIRATION_TIME = 60_000l; // 1000x60x5 = 1 min

	public static final String AUTH_URL = "/api/auth";
	public static final String SIGNIN_URL = AUTH_URL + "/signin";
	public static final String SIGNUP_URL = AUTH_URL + "/signup";

	public static final String JWT_SUBJECT = "loggedUser";
	public static final String USER_ID = "id";
	public static final String USER_EMAIL = "email";
	public static final String USER_ROLES = "roles";

}
