/**
 * 
 */
package br.com.cams7.cadferias.repository;

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

import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.vo.filter.UserFilterVO;
import br.com.cams7.cadferias.repository.common.BaseRepositoryImpl;

/**
 * @author ceanm
 *
 */
@Repository
public class UserRepositoryImpl extends BaseRepositoryImpl<UserEntity, Long, UserFilterVO>
		implements UserRepositoryCustom {

	private static final String FIELD_EMAIL = "email";

	private static final int INDEX_CREATEDBY = 0;

	@Override
	protected Join<?, ?>[] getJoin(Root<UserEntity> root, boolean isFetch) {
		List<Join<?, ?>> join = new ArrayList<>();

		join.add(getJoin(root, FIELD_CREATEDBY, isFetch));

		return join.toArray(new Join<?, ?>[0]);
	}

	@Override
	protected List<Predicate> getConditionalWithFilter(boolean globalFilter, UserFilterVO filter, CriteriaBuilder cb,
			Root<UserEntity> root, Join<?, ?>... join) {
		return getConditionalWithUserFilter(INDEX_CREATEDBY, globalFilter, filter, cb, root, join);
	}

	public List<Predicate> getConditionalWithUserFilter(int createdByIndex, boolean globalFilter, UserFilterVO filter,
			CriteriaBuilder cb, From<?, ?> root, Join<?, ?>... join) {
		if (filter == null)
			return null;

		List<Predicate> conditional = new ArrayList<>();

		if (isNotBlank(filter.getEmail()))
			conditional.add(cb.like(cb.lower(root.get(FIELD_EMAIL)), getLowerValue2Like(filter.getEmail())));

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
