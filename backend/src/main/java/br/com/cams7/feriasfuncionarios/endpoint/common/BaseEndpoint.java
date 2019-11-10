/**
 * 
 */
package br.com.cams7.feriasfuncionarios.endpoint.common;

import static br.com.cams7.feriasfuncionarios.common.Utils.LOCALE;
import static br.com.cams7.feriasfuncionarios.common.Utils.getEntityName;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.io.Serializable;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.cams7.feriasfuncionarios.common.Base;
import br.com.cams7.feriasfuncionarios.common.Validations.OnCreate;
import br.com.cams7.feriasfuncionarios.common.Validations.OnUpdate;
import br.com.cams7.feriasfuncionarios.common.Views.Details;
import br.com.cams7.feriasfuncionarios.common.Views.Public;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.SearchVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.AuditableFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageVO;
import br.com.cams7.feriasfuncionarios.service.common.BaseService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * @author ceanm
 *
 */
@Validated
public abstract class BaseEndpoint<S extends BaseService<E, ID, F>, E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		extends Base {

	private static final int SERVICE_INDEX = 0;
	private static final int ENTITY_INDEX = 1;
	private static final int ID_INDEX = 2;
	private static final int FILTER_INDEX = 3;

	@Autowired
	protected S service;

//	@ApiOperation("Lista todas as entidades.")
//	@JsonView(Views.Public.class)
//	@ResponseStatus(value = OK)
//	@GetMapping
//	public Iterable<E> getAll() {
//		return service.getAll();
//	}

	@ApiOperation("Carrega as entidades pela paginação e filtro de busca.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@PostMapping(path = "search")
	public PageVO<E, ID> getBySearch(@ApiParam("Filtro de busca informado.") @Valid @RequestBody SearchVO<F> search) {
		PageVO<E, ID> page = service.getBySearch(search);
		if (page.getTotalElements() > 0) {
			page.getContent().forEach(entity -> {
				entity.add(getWithAuditByIdRel(entity.getEntityId()));
				entity.add(getByIdRel(entity.getEntityId()));
				entity.add(deleteRel(entity.getEntityId()));
			});
		}
		return page;
	}

	@ApiOperation("Busca a entidade pelo ID.")
	@JsonView(Public.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "{id:\\d+}", consumes = { MediaType.ALL_VALUE })
	public E getById(@ApiParam("ID da entidade.") @PathVariable String id) {
		@SuppressWarnings("unchecked")
		E entity = service.getById((ID) getId(id));

		entity.add(getBySearchRel());
		entity.add(getWithAuditByIdRel(entity.getEntityId()));
		entity.add(updateRel(entity.getEntityId()));

		return entity;
	}

	@ApiOperation("Busca a entidade pelo ID.")
	@JsonView(Details.class)
	@ResponseStatus(value = OK)
	@GetMapping(path = "{id:\\d+}/details", consumes = { MediaType.ALL_VALUE })
	public E getWithAuditById(@ApiParam("ID da entidade.") @PathVariable String id) {
		@SuppressWarnings("unchecked")
		E entity = service.getWithAuditById((ID) getId(id));

		entity.add(getBySearchRel());
		entity.add(getByIdRel(entity.getEntityId()));
		entity.add(deleteRel(entity.getEntityId()));

		return entity;
	}

	@ApiOperation("Cadastra uma nova entidade.")
	@JsonView(Details.class)
	@Validated(OnCreate.class)
	@ResponseStatus(value = CREATED)
	@PostMapping
	public E create(@ApiParam("Entidade informada.") @Valid @RequestBody E entity) {
		return service.create(entity);
	}

	@ApiOperation("Atualiza a entidade pelo ID.")
	@JsonView(Details.class)
	@Validated(OnUpdate.class)
	@ResponseStatus(value = OK)
	@PutMapping
	public E update(@ApiParam("Entidade informada.") @Valid @RequestBody E entity) {
		return service.update(entity);//
	}

	@SuppressWarnings("unchecked")
	@ApiOperation("Remove a entidade pelo ID.")
	@DeleteMapping(path = "{id:\\d+}", consumes = { MediaType.ALL_VALUE })
	public ResponseEntity<Void> delete(@ApiParam("ID da entidade.") @PathVariable String id) {
		service.delete((ID) getId(id));
		return new ResponseEntity<Void>(OK);
	}

	private Link getBySearchRel() {
		final String ENDPOINT = String.format("%s.getBySearch", getEndPointName());
		@SuppressWarnings("unchecked")
		Link rel = linkTo(methodOn(this.getClass()).getBySearch(null)).withRel(ENDPOINT).withType(POST.name())
				.withMedia(APPLICATION_JSON_UTF8_VALUE).withHreflang(getHreflang()).withTitle(getMessage(ENDPOINT))
				.withDeprecation(getDeprecation());
		return rel;
	}

	private Link getByIdRel(ID id) {
		final String ENDPOINT = String.format("%s.getById", getEndPointName());
		return linkTo(methodOn(this.getClass()).getById(String.valueOf(id))).withRel(ENDPOINT).withType(GET.name())
				.withMedia(APPLICATION_JSON_UTF8_VALUE).withHreflang(getHreflang()).withTitle(getMessage(ENDPOINT, id))
				.withDeprecation(getDeprecation());
	}

	private Link getWithAuditByIdRel(ID id) {
		final String ENDPOINT = String.format("%s.getWithAuditById", getEndPointName());
		return linkTo(methodOn(this.getClass()).getWithAuditById(String.valueOf(id))).withRel(ENDPOINT)
				.withType(GET.name()).withMedia(APPLICATION_JSON_UTF8_VALUE).withHreflang(getHreflang())
				.withTitle(getMessage(ENDPOINT, id)).withDeprecation(getDeprecation());
	}

	private Link updateRel(ID id) {
		final String ENDPOINT = String.format("%s.update", getEndPointName());
		@SuppressWarnings("unchecked")
		Link rel = linkTo(methodOn(this.getClass()).update(null)).withRel(ENDPOINT).withType(PUT.name())
				.withMedia(APPLICATION_JSON_UTF8_VALUE).withHreflang(getHreflang()).withTitle(getMessage(ENDPOINT, id))
				.withDeprecation(getDeprecation());
		return rel;
	}

	private Link deleteRel(ID id) {
		final String ENDPOINT = String.format("%s.delete", getEndPointName());
		return linkTo(methodOn(this.getClass()).delete(String.valueOf(id))).withRel(ENDPOINT).withType(DELETE.name())
				.withMedia(APPLICATION_JSON_UTF8_VALUE).withHreflang(getHreflang()).withTitle(getMessage(ENDPOINT, id))
				.withDeprecation(getDeprecation());
	}

	protected final String getEndPointName() {
		return String.format("%sEndpoint", getEntityName(getEntityType().getSimpleName(), true));
	}

	protected final String getHreflang() {
		return String.format("%s-%s", LOCALE.getLanguage(), LOCALE.getCountry());
	}

	protected final String getDeprecation() {
		return Boolean.FALSE.toString();
	}

	protected Class<S> getServiceType() {
		@SuppressWarnings("unchecked")
		Class<S> type = (Class<S>) getTypeFromTemplate(SERVICE_INDEX);
		return type;
	}

	@Override
	protected int getIdIndex() {
		return ID_INDEX;
	}

	@Override
	protected int getEntityIndex() {
		return ENTITY_INDEX;
	}

	@Override
	protected int getFilterIndex() {
		return FILTER_INDEX;
	}

}
