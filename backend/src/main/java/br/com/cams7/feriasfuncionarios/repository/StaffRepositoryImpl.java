/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.StaffFilterVO;
import br.com.cams7.feriasfuncionarios.repository.common.BaseRepositoryImpl;

/**
 * @author ceanm
 *
 */
@Repository
public class StaffRepositoryImpl extends BaseRepositoryImpl<StaffEntity, Long, StaffFilterVO>
		implements StaffRepositoryCustom {

	private static final String FIELD_NAME = "name";

	private static final int INDEX_CREATEDBY = 0;

	@Override
	protected Join<?, ?>[] getJoin(Root<StaffEntity> root, boolean isFetch) {
		List<Join<?, ?>> join = new ArrayList<>();

		join.add(getJoin(root, FIELD_CREATEDBY, isFetch));

		return join.toArray(new Join<?, ?>[0]);
	}

	@Override
	protected List<Predicate> getConditionalWithFilter(boolean globalFilter, StaffFilterVO filter, CriteriaBuilder cb,
			Root<StaffEntity> root, Join<?, ?>... join) {
		return getConditionalWithStaffFilter(INDEX_CREATEDBY, globalFilter, filter, cb, root, join);
	}

	public List<Predicate> getConditionalWithStaffFilter(int createdByIndex, boolean globalFilter, StaffFilterVO filter,
			CriteriaBuilder cb, From<?, ?> root, Join<?, ?>... join) {
		if (filter == null)
			return null;

		List<Predicate> conditional = new ArrayList<>();

		if (isNotBlank(filter.getName()))
			conditional.add(cb.like(cb.lower(root.get(FIELD_NAME)), getLowerValue2Like(filter.getName())));

		if (join != null && join.length > 0 && filter.getEmailOfCreatedBy() != null
				&& isNotBlank(filter.getEmailOfCreatedBy()))
			conditional.add(cb.like(cb.lower(join[createdByIndex].get(FIELD_CREATEDBY_EMAIL)),
					getLowerValue2Like(filter.getEmailOfCreatedBy())));

		return conditional;
	}

	@Override
	protected Path<?> getPathByProperty(Root<?> root, String property, Join<?, ?>... join) {
		if (property.startsWith(String.format("%s.", FIELD_CREATEDBY)))
			return join[INDEX_CREATEDBY].get(property.split("\\.")[1]);

		return root.get(property);
	}

}
