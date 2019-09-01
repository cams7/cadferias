/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.service.UserService;
import io.swagger.annotations.Api;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de usuários.")
@RestController
@RequestMapping(path = "/users")
public class UserEndpoint extends BaseEndpoint<UserService, UserEntity, Long> {

}
