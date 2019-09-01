/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint.common;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import java.io.Serializable;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Views;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
public abstract class BaseEndpoint<S extends BaseService<E, ID>, E extends Auditable<ID>, ID extends Serializable> {

	@Autowired
	protected S service;

	@ApiOperation("Lista todas as entidades.")
	@JsonView(Views.Public.class)
	@ResponseStatus(value = OK)
	@GetMapping
	public Iterable<E> getAll() {
		return service.getAll();
	}

	@ApiOperation("Busca a entidade pelo ID.")
	@JsonView(Views.Detail.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "{id}")
	public E getById(@ApiParam("ID da entidade.") @PathVariable ID id) {
		return service.getById(id);
	}

	@ApiOperation("Cadastra uma nova entidade.")
	@JsonView(Views.Detail.class)
	@ResponseStatus(value = CREATED)
	@PostMapping
	public E create(@ApiParam("Entidade informada.") @Valid @RequestBody E entity) {
		return service.create(entity);
	}

	@ApiOperation("Atualiza a entidade pelo ID.")
	@JsonView(Views.Detail.class)
	@ResponseStatus(value = OK)
	@PutMapping
	public E update(@ApiParam("Entidade informada.") @Valid @RequestBody E entity) {
		return service.update(entity);//
	}

	@ApiOperation("Remove a entidade pelo ID.")
	@ResponseStatus(value = OK)
	@DeleteMapping(path = "{id}")
	public void delete(@ApiParam("ID da entidade.") @PathVariable ID id) {
		service.delete(id);
	}

}
