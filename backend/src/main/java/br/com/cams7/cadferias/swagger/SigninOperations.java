/**
 * 
 */
package br.com.cams7.cadferias.swagger;

import static br.com.cams7.cadferias.security.SecurityConstants.SIGNIN_URL;
import static java.util.Arrays.asList;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;

import com.fasterxml.classmate.TypeResolver;
import com.google.common.collect.Multimap;

import springfox.documentation.builders.ApiListingBuilder;
import springfox.documentation.builders.OperationBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiDescription;
import springfox.documentation.service.ApiListing;
import springfox.documentation.service.Operation;
import springfox.documentation.spring.web.plugins.DocumentationPluginsManager;
import springfox.documentation.spring.web.readers.operation.CachingOperationNameGenerator;
import springfox.documentation.spring.web.scanners.ApiDescriptionReader;
import springfox.documentation.spring.web.scanners.ApiListingScanner;
import springfox.documentation.spring.web.scanners.ApiListingScanningContext;
import springfox.documentation.spring.web.scanners.ApiModelReader;

/**
 * @author ceanm
 *
 */
public class SigninOperations extends ApiListingScanner {

	@Autowired
	private TypeResolver typeResolver;

	@Autowired
	public SigninOperations(ApiDescriptionReader apiDescriptionReader, ApiModelReader apiModelReader,
			DocumentationPluginsManager pluginsManager) {
		super(apiDescriptionReader, apiModelReader, pluginsManager);
	}

	@Override
	public Multimap<String, ApiListing> scan(ApiListingScanningContext context) {
		final Multimap<String, ApiListing> def = super.scan(context);

		final List<ApiDescription> apis = new LinkedList<>();

		final List<Operation> operations = new ArrayList<>();

		final Set<String> mediaTypes = asList(APPLICATION_JSON_UTF8_VALUE).stream().collect(Collectors.toSet());

		// @formatter:off
	    operations.add(new OperationBuilder(new CachingOperationNameGenerator())
	        .method(HttpMethod.POST)
	        .uniqueId("signin")
	        .consumes(mediaTypes)	 
	        .produces(mediaTypes)
	        .parameters(asList(
	        	new ParameterBuilder()
	            	.name("body")
	            	.required(true)
	            	.description("The body of request")
	            	.parameterType("body")            
	            	.type(typeResolver.resolve(String.class))
	            	.modelRef(new ModelRef("string"))
	            	.build()
	         ))
	        .responseMessages(asList(
	        	new ResponseMessageBuilder()
	        		.code(OK.value())
	        		.message(OK.getReasonPhrase())
	        		.responseModel(new ModelRef("string"))
	        		.build(),
	        	new ResponseMessageBuilder()
	        		.code(UNAUTHORIZED.value())
	        		.message(UNAUTHORIZED.getReasonPhrase())
	        		.build(),
	        	new ResponseMessageBuilder()
	        		.code(NOT_FOUND.value())
	        		.message(NOT_FOUND.getReasonPhrase())
	        		.build()
	        ).stream().collect(Collectors.toSet()))
	        .summary("Sign In") // 
	        .notes("Here you can log in")
	        .build());	   
	    // @formatter:on

		@SuppressWarnings("deprecation")
		ApiDescription description = new ApiDescription(SIGNIN_URL, "Authentication documentation", operations, false);
		apis.add(description);

		def.put("authentication", new ApiListingBuilder(context.getDocumentationContext().getApiDescriptionOrdering())
				.apis(apis).description("Custom authentication").build());

		return def;
	}

}
