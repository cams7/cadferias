/**
 * 
 */
package br.com.cams7.feriasfuncionarios.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author ceanm
 *
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	private static final String ORIGIN_URL = "http://localhost:4200";

	private static final String HEAD_METHOD = "HEAD";
	private static final String GET_METHOD = "GET";
	private static final String POST_METHOD = "POST";
	private static final String PUT_METHOD = "PUT";
	private static final String DELETE_METHOD = "DELETE";
	private static final int MAX_AGE = 3600;

	// By default all origins and GET, HEAD and POST methods are allowed.
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(ORIGIN_URL)
				.allowedMethods(HEAD_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD, DELETE_METHOD).allowCredentials(false)
				.maxAge(MAX_AGE);
	}

}
