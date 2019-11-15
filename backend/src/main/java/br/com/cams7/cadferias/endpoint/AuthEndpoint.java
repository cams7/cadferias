/**
 * 
 */
package br.com.cams7.cadferias.endpoint;

import static br.com.cams7.cadferias.security.SecurityConstants.AUTH_URL;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.cadferias.common.Views.Public;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para autenticação do usuário.")
@RestController
@RequestMapping(path = AUTH_URL, consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class AuthEndpoint {

	@Autowired
	private UserService userService;

	@ApiOperation("Cadastra um novo usuário.")
	@JsonView(Public.class)
	@ResponseStatus(OK)
	@PostMapping(path = "/signup")
	public UserEntity registerUser(@ApiParam("Informações do novo usuário.") @Valid @RequestBody UserEntity user) {
		userService.create(user);
		return user;
	}
}
