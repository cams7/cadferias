/**
 * 
 */
package br.com.cams7.feriasfuncionarios.security;

import static br.com.cams7.feriasfuncionarios.security.SecurityConstants.AUTH_URL;
import static br.com.cams7.feriasfuncionarios.security.SecurityConstants.HEADER_STRING;
import static br.com.cams7.feriasfuncionarios.security.SecurityConstants.SIGNIN_URL;

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

	private static final String ORIGIN_URL = "http://localhost:4200";

	// private static final String OPTIONS_METHOD = "OPTIONS";
	private static final String GET_METHOD = "GET";
	private static final String POST_METHOD = "POST";
	private static final String PUT_METHOD = "PUT";
	private static final String DELETE_METHOD = "DELETE";

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
		configuration.setAllowedOrigins(Arrays.asList(ORIGIN_URL));
		configuration.setAllowedMethods(
				Arrays.asList(/* OPTIONS_METHOD, */ GET_METHOD, POST_METHOD, PUT_METHOD, DELETE_METHOD));
		// configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(Arrays.asList(HEADER_STRING, /*"Cache-Control",*/ "Content-Type"));
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
}
