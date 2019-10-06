/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service.common;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import br.com.cams7.feriasfuncionarios.common.Utils;
import br.com.cams7.feriasfuncionarios.error.AppConstraintViolationException;
import br.com.cams7.feriasfuncionarios.error.AppInvalidDataException;
import br.com.cams7.feriasfuncionarios.error.AppResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.error.vo.FieldValidationErrorVO.FieldErrorVO;
import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.SearchVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.AuditableFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageVO;
import br.com.cams7.feriasfuncionarios.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
@Transactional
public abstract class BaseServiceImpl<R extends SoftDeleteCrudRepository<E, ID>, E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		implements BaseService<E, ID, F> {

	private static final int REPOSITORY_INDEX = 0;
	private static final int ENTITY_INDEX = 1;
	private static final int ID_INDEX = 2;
	private static final int FILTER_INDEX = 3;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private LocalValidatorFactoryBean validator;

	@Autowired
	protected R reporitory;

//	@Transactional(readOnly = true)
//	@Override
//	public Iterable<E> getAll() {
//		return reporitory.findAll();
//	}

	@Transactional(readOnly = true)
	@Override
	public E getById(ID id) {
		return reporitory.findById(id).orElseThrow(() -> new AppResourceNotFoundException("Entity.notFound",
				Utils.getEntityName(getEntityType().getSimpleName()), id));
	}

	@Transactional(readOnly = true)
	@Override
	public boolean existsById(ID id) {
		return reporitory.existsById(id);
	}

	@Override
	public E create(E entity) {
		entity.setId(null);
		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public E update(E entity) {
		if (entity.getId() == null)
			throw new AppInvalidDataException("Entity.idNotNull", Utils.getEntityName(getEntityType().getSimpleName()));

		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public void delete(ID id) {
		if (existsById(id))
			reporitory.deleteById(id);
	}

	@Override
	public void deleteAllById(Iterable<ID> ids) {
		reporitory.deleteAllById(ids);
	}

	@Transactional(readOnly = true)
	@Override
	public PageVO<E, ID> getBySearch(SearchVO<F> search) {
		@SuppressWarnings("unchecked")
		PageVO<E, ID> page = reporitory.findBySearch((SearchVO<AuditableFilterVO>) search);
		return page;
	}

	@Override
	public void checkViolations(String prefix, E entity) {
		Set<ConstraintViolation<E>> violations = validator.validate(entity);
		if (CollectionUtils.isNotEmpty(violations))
			throw new AppConstraintViolationException(prefix, violations);
	}

	private String getMessage(String codeMessage, Object... args) {
		return Utils.getMessage(messageSource, codeMessage, args);
	}

	protected Class<R> getRepositoryType() {
		@SuppressWarnings("unchecked")
		Class<R> type = (Class<R>) getTypeFromTemplate(REPOSITORY_INDEX);
		return type;
	}

	protected Class<E> getEntityType() {
		@SuppressWarnings("unchecked")
		Class<E> type = (Class<E>) getTypeFromTemplate(ENTITY_INDEX);
		return type;
	}

	protected Class<ID> getIdType() {
		@SuppressWarnings("unchecked")
		Class<ID> type = (Class<ID>) getTypeFromTemplate(ID_INDEX);
		return type;
	}

	protected Class<F> getFilterType() {
		@SuppressWarnings("unchecked")
		Class<F> type = (Class<F>) getTypeFromTemplate(FILTER_INDEX);
		return type;
	}

	private Type getTypeFromTemplate(int index) {
		return ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[index];
	}

	protected FieldErrorVO getFieldError(String field, Object value, String codeMessage, Object... args) {
		// @formatter:off
		return FieldErrorVO.builder()
				.codes(null)
				.arguments(null)
				.defaultMessage(getMessage(codeMessage, args))
				.objectName(Utils.getEntityName(getEntityType().getSimpleName()))
				.field(field)
				.rejectedValue(value)
				.bindingFailure(false)
				.code(null)
				.build();
		// @formatter:on
	}

}
