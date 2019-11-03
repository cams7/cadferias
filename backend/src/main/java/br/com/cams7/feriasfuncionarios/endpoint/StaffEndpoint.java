/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint;

import static org.springframework.http.HttpStatus.OK;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.endpoint.common.BaseEndpoint;
import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.StaffFilterVO;
import br.com.cams7.feriasfuncionarios.service.StaffService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Api("Endpoint utilizado para criação, recuperação, atualização e exclusão de equipes.")
@RestController
@RequestMapping(path = "/staffs")
public class StaffEndpoint extends BaseEndpoint<StaffService, StaffEntity, Long, StaffFilterVO> {

	@ApiOperation("Carrega as equipes pelo filtro de busca do select.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@PostMapping(path = "searchByName")
	public Iterable<StaffEntity> getByName(
			@ApiParam("Filtro de busca informado.") @Valid @RequestBody SearchBySelectVO search) {
		return service.getByName(search);
	}
}
