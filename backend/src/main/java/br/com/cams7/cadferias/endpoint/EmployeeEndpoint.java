/**
 * 
 */
package br.com.cams7.cadferias.endpoint;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.cadferias.common.Views.Public;
import br.com.cams7.cadferias.endpoint.common.BaseEndpoint;
import br.com.cams7.cadferias.model.EmployeeEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.cadferias.service.EmployeeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de funcionários.")
@RestController
@RequestMapping(path = "/employees", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class EmployeeEndpoint extends BaseEndpoint<EmployeeService, EmployeeEntity, Long, EmployeeFilterVO> {

	@ApiOperation("Busca o funcionário pelo ID.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "only/{id}", consumes = { MediaType.ALL_VALUE })
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