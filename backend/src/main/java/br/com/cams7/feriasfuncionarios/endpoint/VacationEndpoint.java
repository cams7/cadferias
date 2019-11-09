/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.VacationEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.VacationFilterVO;
import br.com.cams7.feriasfuncionarios.service.VacationService;
import io.swagger.annotations.Api;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de férias.")
@RestController
@RequestMapping(path = "/vacations", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class VacationEndpoint extends BaseEndpoint<VacationService, VacationEntity, Long, VacationFilterVO> {
}
