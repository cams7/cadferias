/**
 * 
 */
package br.com.cams7.cadferias.repository.common;

import static br.com.cams7.cadferias.model.vo.pagination.SortVO.Direction.DESC;

import java.io.Serializable;
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

import br.com.cams7.cadferias.common.Base;
import br.com.cams7.cadferias.model.common.Auditable;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.SearchVO;
import br.com.cams7.cadferias.model.vo.filter.AuditableFilterVO;
import br.com.cams7.cadferias.model.vo.pagination.PageInputVO;
import br.com.cams7.cadferias.model.vo.pagination.PageVO;
import br.com.cams7.cadferias.model.vo.pagination.SortVO;

/**
 * @author ceanm
 *
 */
public abstract class BaseRepositoryImpl<E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO>
		extends Base implements BaseRepository<E, ID, F> {

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

	@Override
	public PageVO<E, ID> findBySearch(SearchVO<F> search) {
		F filter = search.getSearchFilter();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		@SuppressWarnings("unchecked")
		CriteriaQuery<E> selectQuery = cb.createQuery((Class<E>) getEntityType());
		@SuppressWarnings("unchecked")
		Root<E> root = selectQuery.from((Class<E>) getEntityType());

		Join<?, ?>[] join = getJoin(root, true);

		selectQuery.select(root);

		selectQuery.where(cb.and(getConditional(search.isGlobalFilter(), filter, cb, root, join)));

		PageInputVO pageInput = search.getPageInput();

		Order[] ordersBy = getOrdersBy(pageInput, cb, root, join);
		if (ordersBy != null && ordersBy.length > 0)
			selectQuery.orderBy(ordersBy);

		List<E> content = getContent(selectQuery, pageInput.getPageNumber(), pageInput.getSize());

		Long totalElements = getTotalElements(search.isGlobalFilter(), filter, pageInput, cb);

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

	private Long getTotalElements(boolean globalFilter, F filter, PageInputVO pageInput, CriteriaBuilder cb) {
		Long totalElements = pageInput.getTotalElements();
		if (pageInput.getChangedQuery()) {
			CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
			@SuppressWarnings("unchecked")
			Root<E> root = countQuery.from((Class<E>) getEntityType());
			Join<?, ?>[] join = getJoin(root, false);

			countQuery.select(cb.count(root));

			countQuery.where(cb.and(getConditional(globalFilter, filter, cb, root, join)));

			totalElements = em.createQuery(countQuery).getSingleResult();
		}

		return totalElements;
	}

	private Predicate[] getConditional(boolean globalFilter, F filter, CriteriaBuilder cb, Root<E> root,
			Join<?, ?>... join) {
		List<Predicate> and = getAndWithAuditableFilter(globalFilter, filter, cb, root);
		List<Predicate> conditionalWithFilter = getConditionalWithFilter(globalFilter, filter, cb, root, join);

		if (conditionalWithFilter != null && !conditionalWithFilter.isEmpty()) {
			if (globalFilter)
				and.add(cb.or(conditionalWithFilter.stream().toArray(Predicate[]::new)));
			else
				and.addAll(conditionalWithFilter);
		}

		return and.stream().toArray(Predicate[]::new);
	}

	protected abstract Join<?, ?>[] getJoin(Root<E> root, boolean isFetch);

	protected static Join<?, ?> getJoin(From<?, ?> from, String fieldName, boolean isFetch) {
		return (Join<?, ?>) (isFetch ? from.fetch(fieldName, JoinType.INNER) : from.join(fieldName, JoinType.INNER));
	}

	protected abstract List<Predicate> getConditionalWithFilter(boolean globalFilter, F filter, CriteriaBuilder cb,
			Root<E> root, Join<?, ?>... join);

	private static List<Predicate> getAndWithAuditableFilter(boolean globalFilter, AuditableFilterVO filter,
			CriteriaBuilder cb, Root<?> root) {
		List<Predicate> and = new ArrayList<>();
		and.add(cb.isTrue(root.get(FIELD_ACTIVE)));

		if (!globalFilter && filter != null) {
			final LocalTime START_OF_DAY = LocalTime.parse("00:00:00");
			final LocalTime END_OF_DAY = LocalTime.parse("23:59:59");

			if (filter.getCreatedDate() != null && filter.getCreatedDate().length == 2) {
				and.add(cb.greaterThanOrEqualTo(root.get(FIELD_CREATEDDATE),
						filter.getCreatedDate()[0].atTime(START_OF_DAY)));
				and.add(cb.lessThanOrEqualTo(root.get(FIELD_CREATEDDATE),
						filter.getCreatedDate()[1].atTime(END_OF_DAY)));
			}

			if (filter.getLastModifiedDate() != null && filter.getLastModifiedDate().length == 2) {
				and.add(cb.greaterThanOrEqualTo(root.get(FIELD_LASTMODIFIEDDATE),
						filter.getLastModifiedDate()[0].atTime(START_OF_DAY)));
				and.add(cb.lessThanOrEqualTo(root.get(FIELD_LASTMODIFIEDDATE),
						filter.getLastModifiedDate()[1].atTime(END_OF_DAY)));
			}
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
		return ordersBy.stream().toArray(Order[]::new);
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

	/**
	 * @param search    Filtro de Pequisa
	 * @param fieldName Nome do campo
	 * @return Entidades
	 */
	protected Iterable<E> findBySearch(SearchBySelectVO search, String fieldName) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		@SuppressWarnings("unchecked")
		CriteriaQuery<E> selectQuery = cb.createQuery((Class<E>) getEntityType());
		@SuppressWarnings("unchecked")
		Root<E> root = selectQuery.from((Class<E>) getEntityType());
		selectQuery.select(root);
		Predicate[] and = new Predicate[] { cb.isTrue(root.get(FIELD_ACTIVE)),
				cb.like(cb.lower(root.get(fieldName)), getLowerValue2Like(search.getSearchValue())) };
		selectQuery.where(cb.and(and));

		Path<?> path = root.get(fieldName);
		Order order;
		switch (search.getSort().getDirection()) {
		case DESC:
			order = cb.desc(path);
			break;
		default:
			order = cb.asc(path);
			break;
		}
		selectQuery.orderBy(order);

		TypedQuery<E> typedQuery = em.createQuery(selectQuery);
		typedQuery.setFirstResult(0);
		typedQuery.setMaxResults(search.getSize());
		List<E> staffs = typedQuery.getResultList();
		return staffs;
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
