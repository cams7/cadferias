/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository.common;

import static br.com.cams7.feriasfuncionarios.model.vo.pagination.SortVO.Direction.DESC;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.SearchVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.AuditableFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageInputVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.SortVO;

/**
 * @author ceanm
 *
 */
public abstract class BaseRepositoryImpl<E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		implements BaseRepository<E, ID, F> {

	private static final int ENTITY_INDEX = 0;
	private static final int ID_INDEX = 1;
	private static final int FILTER_INDEX = 2;

	protected static final String FIELD_ACTIVE = "active";
	protected static final String FIELD_CREATEDBY = "createdBy";
	protected static final String FIELD_CREATEDBY_EMAIL = "email";
	protected static final String FIELD_CREATEDDATE = "createdDate";
	protected static final String FIELD_LASTMODIFIEDBY = "lastModifiedBy";
	protected static final String FIELD_LASTMODIFIEDBY_EMAIL = "email";
	protected static final String FIELD_LASTMODIFIEDDATE = "lastModifiedDate";

	@PersistenceContext
	protected EntityManager em;

	private Type getTypeFromTemplate(int index) {
		return ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[index];
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

	@Override
	public PageVO<E, ID> findBySearch(SearchVO<F> search) {
		F filter = search.getSearchFilter();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<E> selectQuery = cb.createQuery(getEntityType());
		Root<E> root = selectQuery.from(getEntityType());

		Join<?, ?>[] join = getJoin(root, true);

		selectQuery.select(root);

		selectQuery.where(cb.and(getAnd(filter, cb, root, join)));

		PageInputVO pageInput = search.getPageInput();

		Order[] ordersBy = getOrdersBy(pageInput, cb, root, join);
		if (ordersBy != null && ordersBy.length > 0)
			selectQuery.orderBy(ordersBy);

		List<E> content = getContent(selectQuery, pageInput.getPageNumber(), pageInput.getSize());

		Long totalElements = getTotalElements(filter, cb, pageInput);

		PageVO<E, ID> page = new PageVO<>(pageInput.getPageNumber(), pageInput.getSize(), content, totalElements,
				pageInput.getChangedQuery(), pageInput.getSort());

		return page;
	}

	private List<E> getContent(CriteriaQuery<E> selectQuery, Integer pageNumber, Integer size) {
		TypedQuery<E> typedQuery = em.createQuery(selectQuery);
		typedQuery.setFirstResult(pageNumber * size);
		typedQuery.setMaxResults(size);
		List<E> content = typedQuery.getResultList();
		return content;
	}

	private Long getTotalElements(F filter, CriteriaBuilder cb, PageInputVO pageInput) {
		Long totalElements = pageInput.getTotalElements();
		if (pageInput.getChangedQuery()) {
			CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
			Root<E> root = countQuery.from(getEntityType());
			Join<?, ?>[] join = getJoin(root, false);

			countQuery.select(cb.count(root));

			countQuery.where(cb.and(getAnd(filter, cb, root, join)));

			totalElements = em.createQuery(countQuery).getSingleResult();
		}

		return totalElements;
	}

	private Predicate[] getAnd(F filter, CriteriaBuilder cb, Root<E> root, Join<?, ?>... join) {
		List<Predicate> and = getAndWithAuditableFilter(cb, root, filter);
		List<Predicate> andWithFilter = getAndWithFilter(filter, cb, root, join);

		if (andWithFilter != null && !andWithFilter.isEmpty())
			and.addAll(andWithFilter);

		return and.toArray(new Predicate[0]);
	}

	protected abstract Join<?, ?>[] getJoin(Root<E> root, boolean isFetch);

	protected static Join<?, ?> getJoin(From<?, ?> from, String fieldName, boolean isFetch) {
		return (Join<?, ?>) (isFetch ? from.fetch(fieldName, JoinType.INNER) : from.join(fieldName, JoinType.INNER));
	}

	protected abstract List<Predicate> getAndWithFilter(F filter, CriteriaBuilder cb, Root<E> root, Join<?, ?>... join);

	private static List<Predicate> getAndWithAuditableFilter(CriteriaBuilder cb, Root<?> root,
			AuditableFilterVO filter) {
		List<Predicate> and = new ArrayList<>();
		and.add(cb.isTrue(root.get(FIELD_ACTIVE)));

		if (filter != null) {
			final LocalTime START_OF_DAY = LocalTime.parse("00:00:00");
			final LocalTime END_OF_DAY = LocalTime.parse("23:59:59");

			if (filter.getStartOfCreatedDate() != null)
				and.add(cb.greaterThanOrEqualTo(root.get(FIELD_CREATEDDATE),
						filter.getStartOfCreatedDate().atTime(START_OF_DAY)));
			if (filter.getEndOfCreatedDate() != null)
				and.add(cb.lessThanOrEqualTo(root.get(FIELD_CREATEDDATE),
						filter.getEndOfCreatedDate().atTime(END_OF_DAY)));

			if (filter.getStartOfLastModifiedDate() != null)
				and.add(cb.greaterThanOrEqualTo(root.get(FIELD_LASTMODIFIEDDATE),
						filter.getStartOfLastModifiedDate().atTime(START_OF_DAY)));
			if (filter.getEndOfLastModifiedDate() != null)
				and.add(cb.lessThanOrEqualTo(root.get(FIELD_LASTMODIFIEDDATE),
						filter.getEndOfLastModifiedDate().atTime(END_OF_DAY)));
		}
		return and;
	}

	private Order[] getOrdersBy(PageInputVO pageInput, CriteriaBuilder cb, Root<?> root, Join<?, ?>... join) {
		List<Order> ordersBy = new ArrayList<>();
		for (SortVO sort : pageInput.getSort()) {
			String property = sort.getProperty();

			Path<?> path = getPathByProperty(root, property, join);

			ordersBy.add(getOrderBySort(sort, cb, path));
		}
		return ordersBy.toArray(new Order[0]);
	}

	protected abstract Path<?> getPathByProperty(Root<?> root, String property, Join<?, ?>... join);

	protected static Order getOrderBySort(SortVO sort, CriteriaBuilder cb, Path<?> path) {
		return sort.getDirection() == DESC ? cb.desc(path) : cb.asc(path);
	}

	protected static String getValue2Like(String value) {
		return "%" + value.trim() + "%";
	}

	protected static String getLowerValue2Like(String value) {
		return getValue2Like(value).toLowerCase();
	}

}
