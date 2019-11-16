/**
 * 
 */
package br.com.cams7.cadferias.endpoint;

import static br.com.cams7.cadferias.endpoint.EmployeeEndpoint.EMPLOYEEENDPOINT_PATH;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_REGISTER_NEW_VACATION;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping(path = EMPLOYEEENDPOINT_PATH, consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class EmployeeEndpoint extends BaseEndpoint<EmployeeService, EmployeeEntity, Long, EmployeeFilterVO> {

	public static final String EMPLOYEEENDPOINT_PATH = "/employees";
	
	@ApiOperation("Busca o funcionário pelo ID.")
	@PreAuthorize("hasRole('" + ROLE_REGISTER_NEW_VACATION + "')")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "withoutPhotos/{id}", consumes = { MediaType.ALL_VALUE })
	public EmployeeEntity getByIdWithoutPhotos(@ApiParam("ID do funcionário.") @PathVariable Long id) {
		return service.getByIdWithoutPhotos(id);
	}

	@ApiOperation("Carrega os funcionários pelo filtro de busca do select.")
	@PreAuthorize("hasRole('" + ROLE_REGISTER_NEW_VACATION + "')")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@PostMapping(path = "searchByName")
	public Iterable<EmployeeEntity> getByName(
			@ApiParam("Filtro de busca informado.") @Valid @RequestBody SearchBySelectVO search) {
		return service.getByName(search);
	}

}
