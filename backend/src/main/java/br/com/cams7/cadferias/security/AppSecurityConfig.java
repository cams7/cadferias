/**
 * 
 */
package br.com.cams7.cadferias.security;

import static br.com.cams7.cadferias.endpoint.EmployeeEndpoint.EMPLOYEEENDPOINT_PATH;
import static br.com.cams7.cadferias.endpoint.StaffEndpoint.STAFFENDPOINT_PATH;
import static br.com.cams7.cadferias.endpoint.VacationEndpoint.VACATIONENDPOINT_PATH;
import static br.com.cams7.cadferias.endpoint.common.BaseEndpoint.ENDPOINT_SUFFIX_DETAILS;
import static br.com.cams7.cadferias.endpoint.common.BaseEndpoint.ENDPOINT_SUFFIX_SEARCH;
import static br.com.cams7.cadferias.model.RoleEntity.PREFIX_ROLE;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_DELETE_EMPLOYEE;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_DELETE_STAFF;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_DELETE_VACATION;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_LIST_ALL_EMPLOYEES;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_LIST_ALL_STAFFS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_LIST_ALL_VACATIONS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_REGISTER_NEW_EMPLOYEE;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_REGISTER_NEW_STAFF;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_REGISTER_NEW_VACATION;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_UPDATE_EMPLOYEE_DATA;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_UPDATE_STAFF_DATA;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_UPDATE_VACATION_DATA;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_EMPLOYEE_DETAILS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_STAFF_DETAILS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_VACATION_DETAILS;
import static br.com.cams7.cadferias.security.SecurityConstants.AUTH_URL;
import static br.com.cams7.cadferias.security.SecurityConstants.HEADER_STRING;
import static br.com.cams7.cadferias.security.SecurityConstants.SIGNIN_URL;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * @author ceanm
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

	private static final String ORIGIN_DEV_URL = "http://localhost:4200";
	private static final String ORIGIN_HOM_URL = "http://localhost:8081";
	private static final String ORIGIN_GITHUB_URL = "https://cams7.github.io";
	

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthEntryPoint unauthorizedHandler;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(ORIGIN_DEV_URL, ORIGIN_HOM_URL, ORIGIN_GITHUB_URL));
		configuration.setAllowedMethods(
				Arrays.asList(/* OPTIONS.name(), */ GET.name(), POST.name(), PUT.name(), DELETE.name()));
		// configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(Arrays.asList(HEADER_STRING, /* "Cache-Control", */ "Content-Type"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// @formatter:off
		httpSecurity
			.csrf().disable()
			.cors().and()
			.authorizeRequests()
			.antMatchers(AUTH_URL + "/**").permitAll()
			.antMatchers(POST, String.format("/%s/%s", STAFFENDPOINT_PATH, ENDPOINT_SUFFIX_SEARCH)).hasRole(getRoleWithoutPrefix(ROLE_LIST_ALL_STAFFS))
			.antMatchers(GET, String.format("/%s/*", STAFFENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_STAFF), getRoleWithoutPrefix(ROLE_UPDATE_STAFF_DATA))
			.antMatchers(GET, String.format("/%s/*/%s", STAFFENDPOINT_PATH, ENDPOINT_SUFFIX_DETAILS)).hasRole(getRoleWithoutPrefix(ROLE_VIEW_STAFF_DETAILS))
			.antMatchers(POST, String.format("/%s", STAFFENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_STAFF))
			.antMatchers(PUT, String.format("/%s", STAFFENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_UPDATE_STAFF_DATA))
			.antMatchers(DELETE, String.format("/%s/*", STAFFENDPOINT_PATH)).hasRole(getRoleWithoutPrefix(ROLE_DELETE_STAFF))
			.antMatchers(POST, String.format("/%s/%s", EMPLOYEEENDPOINT_PATH, ENDPOINT_SUFFIX_SEARCH)).hasRole(getRoleWithoutPrefix(ROLE_LIST_ALL_EMPLOYEES))
			.antMatchers(GET, String.format("/%s/*", EMPLOYEEENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_EMPLOYEE), getRoleWithoutPrefix(ROLE_UPDATE_EMPLOYEE_DATA))
			.antMatchers(GET, String.format("/%s/*/%s", EMPLOYEEENDPOINT_PATH, ENDPOINT_SUFFIX_DETAILS)).hasRole(getRoleWithoutPrefix(ROLE_VIEW_EMPLOYEE_DETAILS))
			.antMatchers(POST, String.format("/%s", EMPLOYEEENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_EMPLOYEE))
			.antMatchers(PUT, String.format("/%s", EMPLOYEEENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_UPDATE_EMPLOYEE_DATA))
			.antMatchers(DELETE, String.format("/%s/*", EMPLOYEEENDPOINT_PATH)).hasRole(getRoleWithoutPrefix(ROLE_DELETE_EMPLOYEE))
			.antMatchers(POST, String.format("/%s/%s", VACATIONENDPOINT_PATH, ENDPOINT_SUFFIX_SEARCH)).hasRole(getRoleWithoutPrefix(ROLE_LIST_ALL_VACATIONS))
			.antMatchers(GET, String.format("/%s/*", VACATIONENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_VACATION), getRoleWithoutPrefix(ROLE_UPDATE_VACATION_DATA))
			.antMatchers(GET, String.format("/%s/*/%s", VACATIONENDPOINT_PATH, ENDPOINT_SUFFIX_DETAILS)).hasRole(getRoleWithoutPrefix(ROLE_VIEW_VACATION_DETAILS))
			.antMatchers(POST, String.format("/%s", VACATIONENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_REGISTER_NEW_VACATION))
			.antMatchers(PUT, String.format("/%s", VACATIONENDPOINT_PATH)).hasAnyRole(getRoleWithoutPrefix(ROLE_UPDATE_VACATION_DATA))
			.antMatchers(DELETE, String.format("/%s/*", VACATIONENDPOINT_PATH)).hasRole(getRoleWithoutPrefix(ROLE_DELETE_VACATION))
			.anyRequest().authenticated().and()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			// filtra requisições de login
			.addFilterBefore(new JWTAuthenticationFilter(SIGNIN_URL, authenticationManager()), UsernamePasswordAuthenticationFilter.class)			
			// filtra outras requisições para verificar a presença do JWT no header
			.addFilterBefore(new JWTAuthorizationFilter(messageSource), UsernamePasswordAuthenticationFilter.class);
		// @formatter:on
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		// @formatter:off
		web.ignoring().antMatchers(
			"/v2/api-docs", 
			"/configuration/ui", 
			"/swagger-resources/**", 
			"/configuration/**", 
			"/swagger-ui.html", 
			"/webjars/**"
		).antMatchers("/h2/**");
		// @formatter:on
	}

	private static String getRoleWithoutPrefix(String role) {
		return role.replaceFirst(PREFIX_ROLE, "");
	}
}
