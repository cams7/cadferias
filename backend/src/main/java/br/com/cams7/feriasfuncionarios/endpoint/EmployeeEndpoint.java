/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.service.EmployeeService;
import io.swagger.annotations.Api;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de funcionários.")
@RestController
@RequestMapping(path = "/employees")
public class EmployeeEndpoint extends BaseEndpoint<EmployeeService, EmployeeEntity, Long> {

}
