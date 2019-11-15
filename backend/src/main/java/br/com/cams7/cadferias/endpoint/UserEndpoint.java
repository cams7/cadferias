/**
 * 
 */
package br.com.cams7.cadferias.endpoint;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cams7.cadferias.endpoint.common.BaseEndpoint;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.vo.filter.UserFilterVO;
import br.com.cams7.cadferias.service.UserService;
import io.swagger.annotations.Api;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de usuários.")
@RestController
@RequestMapping(path = "/users", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class UserEndpoint extends BaseEndpoint<UserService, UserEntity, Long, UserFilterVO> {
}
