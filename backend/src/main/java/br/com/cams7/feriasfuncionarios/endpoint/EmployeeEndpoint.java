/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import static org.springframework.http.HttpStatus.OK;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.feriasfuncionarios.service.EmployeeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de funcionários.")
@RestController
@RequestMapping(path = "/employees")
public class EmployeeEndpoint extends BaseEndpoint<EmployeeService, EmployeeEntity, Long, EmployeeFilterVO> {

	@ApiOperation("Busca o funcionário pelo ID.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "only/{id}")
	public EmployeeEntity geOnlyEmployeeById(@ApiParam("ID da equipe.") @PathVariable Long id) {
		return service.geOnlyEmployeeById(id);
	}

	@ApiOperation("Carrega os funcionários pelo filtro de busca do select.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@PostMapping(path = "searchByName")
	public Iterable<EmployeeEntity> getByName(
			@ApiParam("Filtro de busca informado.") @Valid @RequestBody SearchBySelectVO search) {
		return service.getByName(search);
	}
}
