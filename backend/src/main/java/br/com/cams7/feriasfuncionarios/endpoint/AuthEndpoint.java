/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import static br.com.cams7.feriasfuncionarios.security.SecurityConstants.AUTH_URL;
import static org.springframework.http.HttpStatus.OK;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para autenticação do usuário.")
@RestController
@RequestMapping(path = AUTH_URL)
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
