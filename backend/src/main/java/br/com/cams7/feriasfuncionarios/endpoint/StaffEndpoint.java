/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.StaffFilterVO;
import br.com.cams7.feriasfuncionarios.service.StaffService;
import io.swagger.annotations.Api;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de equipes.")
@RestController
@RequestMapping(path = "/staffs")
public class StaffEndpoint extends BaseEndpoint<StaffService, StaffEntity, Long, StaffFilterVO> {

}
