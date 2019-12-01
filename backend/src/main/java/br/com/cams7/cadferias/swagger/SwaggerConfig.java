package br.com.cams7.cadferias.swagger;

import static br.com.cams7.cadferias.security.SecurityConstants.HEADER_STRING;
import static br.com.cams7.cadferias.security.SecurityConstants.TOKEN_PREFIX;
import static springfox.documentation.builders.PathSelectors.regex;
import static springfox.documentation.builders.RequestHandlerSelectors.basePackage;
import static springfox.documentation.spi.DocumentationType.SWAGGER_2;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;

import com.google.common.base.Predicate;

import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.spring.web.plugins.DocumentationPluginsManager;
import springfox.documentation.spring.web.scanners.ApiDescriptionReader;
import springfox.documentation.spring.web.scanners.ApiListingScanner;
import springfox.documentation.spring.web.scanners.ApiModelReader;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author ceanm
 *
 */
@Configuration
@EnableSwagger2
@Import(BeanValidatorPluginsConfiguration.class)
public class SwaggerConfig {

	private static final Predicate<RequestHandler> ENDPOINT_PACKAGE;

	private static final List<Parameter> TOKEN_PARAMETER;
	static {
		ENDPOINT_PACKAGE = basePackage("br.com.cams7.cadferias.endpoint");

		TOKEN_PARAMETER = Collections
				.singletonList(new ParameterBuilder().name(HEADER_STRING).description(TOKEN_PREFIX + " token")
						.modelRef(new ModelRef("string")).parameterType("header").required(true).build());
	}

	@Primary
	@Bean
	public ApiListingScanner addExtraOperations(ApiDescriptionReader apiDescriptionReader,
			ApiModelReader apiModelReader, DocumentationPluginsManager pluginsManager) {
		return new SigninOperations(apiDescriptionReader, apiModelReader, pluginsManager);
	}

	@Bean
	public Docket apiApp() {
		return new Docket(SWAGGER_2).groupName("app").apiInfo(metaData()).select().apis(ENDPOINT_PACKAGE)
				.paths(regex("/employees.*|/staffs.*|/vacations.*")).build().globalOperationParameters(TOKEN_PARAMETER);
	}

	private static ApiInfo metaData() {
		return new ApiInfoBuilder().title("Férias dos Funcionários")
				.description("Aplicação utilizada para automatizar as ações relacionadas as férias dos funcionários")
				.version("0.0.1-SNAPSHOT")
				.contact(new Contact("César A. Magalhães", "https://www.linkedin.com/in/cams7", "ceanma@gmail.com"))
				.license("Apache License Version 2.0").licenseUrl("https://www.apache.org/licenses/LICENSE-2.0")
				.build();
	}
}
