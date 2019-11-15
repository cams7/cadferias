/**
 * 
 */
package br.com.cams7.cadferias.service.common;

import static br.com.cams7.cadferias.common.Utils.CLASS_SEPARATOR;
import static br.com.cams7.cadferias.common.Utils.SERVICE_SUFFIX;
import static br.com.cams7.cadferias.common.Utils.getEntityName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.common.Base;
import br.com.cams7.cadferias.error.AppException;
import br.com.cams7.cadferias.error.AppInvalidDataException;
import br.com.cams7.cadferias.error.AppResourceNotFoundException;
import br.com.cams7.cadferias.error.vo.ConstraintViolationWithPrefixVO;
import br.com.cams7.cadferias.model.common.Auditable;
import br.com.cams7.cadferias.model.vo.SearchVO;
import br.com.cams7.cadferias.model.vo.filter.AuditableFilterVO;
import br.com.cams7.cadferias.model.vo.pagination.PageVO;
import br.com.cams7.cadferias.repository.common.SoftDeleteCrudRepository;

/**
 * @author ceanm
 *
 */
@Transactional
public abstract class BaseServiceImpl<R extends SoftDeleteCrudRepository<E, ID>, E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		extends Base implements BaseService<E, ID, F> {

	private static final int REPOSITORY_INDEX = 0;
	private static final int ENTITY_INDEX = 1;
	private static final int ID_INDEX = 2;
	private static final int FILTER_INDEX = 3;

	@Autowired
	private ValidatorFactory validatorFactory;

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
				getMessage(getEntityName(getEntityType().getSimpleName())), id));
	}

	@Transactional(readOnly = true)
	@Override
	public E getWithAuditById(ID id) {
		return reporitory.findWithAuditById(id).orElseThrow(() -> new AppResourceNotFoundException("Entity.notFound",
				getMessage(getEntityName(getEntityType().getSimpleName())), id));
	}

	@Transactional(readOnly = true)
	@Override
	public boolean existsById(ID id) {
		return reporitory.existsById(id);
	}

	@Override
	public E create(E entity) {
		entity.setEntityId(null);
		entity.setActive(true);
		return reporitory.save(entity);
	}

	@Override
	public E update(E entity) {
		if (entity.getEntityId() == null)
			throw new AppInvalidDataException("Entity.idNotNull",
					getMessage(getEntityName(getEntityType().getSimpleName())));

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

	protected void validateField(String fieldName, Object fieldValue, Class<?> validationType) {
		String prefix = getPrefix();

		Validator validator = this.validatorFactory.getValidator();
		@SuppressWarnings({ "rawtypes", "unchecked" })
		Set<ConstraintViolation<E>> constraintViolations = validator
				.validateValue(getEntityType(), fieldName, fieldValue, validationType).stream()
				.map(constraintViolation -> new ConstraintViolationWithPrefixVO(prefix, constraintViolation))
				.collect(Collectors.toSet());
		if (constraintViolations.size() > 0)
			throw new ConstraintViolationException(constraintViolations);
	}

	private String getPrefix() {
		String prefix = Arrays.asList(Thread.currentThread().getStackTrace()).stream().filter(trace -> {
			String className = trace.getClassName();
			return className.startsWith(getClass().getPackageName() + CLASS_SEPARATOR)
					&& className.endsWith(SERVICE_SUFFIX)
					&& !className.endsWith(CLASS_SEPARATOR + getClass().getSuperclass().getSimpleName());
		}).map(trace -> trace.getClassName()).distinct()
				.filter(className -> !className.equals(this.getClass().getName())).map(className -> {
					try {
						Class<?> type = Class.forName(className);
						Class<?> entityType = getEntityType(type);
						return getEntityName(entityType.getSimpleName());
					} catch (ClassNotFoundException e) {
						throw new AppException(e.getMessage(), e);
					}
				}).collect(ArrayList<String>::new, (l, e) -> l.add(0, e), (l1, l2) -> l1.addAll(0, l2)).stream()
				.collect(Collectors.joining(CLASS_SEPARATOR));

		if (!prefix.isBlank())
			prefix += CLASS_SEPARATOR;

		return prefix;
	}

	protected Class<R> getRepositoryType() {
		@SuppressWarnings("unchecked")
		Class<R> type = (Class<R>) getTypeFromTemplate(REPOSITORY_INDEX);
		return type;
	}

	private Class<?> getEntityType(Class<?> type) {
		return getTypeFromTemplate(type, ENTITY_INDEX);
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
