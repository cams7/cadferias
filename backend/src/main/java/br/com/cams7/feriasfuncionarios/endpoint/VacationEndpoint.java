/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

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
@RequestMapping(path = "/vacations")
public class VacationEndpoint extends BaseEndpoint<VacationService, VacationEntity, Long, VacationFilterVO> {

}
