/**
 * 
 */
package br.com.cams7.cadferias.repository;

import static br.com.cams7.cadferias.repository.EmployeeRepositoryImpl.getConditionalWithEmployeeFilter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import br.com.cams7.cadferias.model.VacationEntity;
import br.com.cams7.cadferias.model.vo.filter.VacationFilterVO;
import br.com.cams7.cadferias.repository.common.BaseRepositoryImpl;

/**
 * @author ceanm
 *
 */
@Repository
public class VacationRepositoryImpl extends BaseRepositoryImpl<VacationEntity, Long, VacationFilterVO>
		implements VacationRepositoryCustom {

	private static final String FIELD_STARTDATE = "startDate";
	private static final String FIELD_ENDDATE = "endDate";
	private static final String FIELD_EMPLOYEE = "employee";
	private static final String FIELD_EMPLOYEE_USER = "user";
	private static final String FIELD_EMPLOYEE_STAFF = "staff";

	private static final int INDEX_EMPLOYEE = 0;
	private static final int INDEX_EMPLOYEE_USER = 1;
	private static final int INDEX_EMPLOYEE_STAFF = 2;

	@Override
	protected Join<?, ?>[] getJoin(Root<VacationEntity> root, boolean isFetch) {
		List<Join<?, ?>> join = new ArrayList<>();

		Join<?, ?> employee = getJoin(root, FIELD_EMPLOYEE, isFetch);
		join.add(employee);
		join.add(getJoin(employee, FIELD_EMPLOYEE_USER, isFetch));
		join.add(getJoin(employee, FIELD_EMPLOYEE_STAFF, isFetch));

		return join.toArray(new Join<?, ?>[0]);
	}

	@Override
	protected List<Predicate> getConditionalWithFilter(boolean globalFilter, VacationFilterVO filter,
			CriteriaBuilder cb, Root<VacationEntity> root, Join<?, ?>... join) {
		return getConditionalWithVacationFilter(INDEX_EMPLOYEE, INDEX_EMPLOYEE_USER, INDEX_EMPLOYEE_STAFF, globalFilter,
				filter, cb, root, join);
	}

	public List<Predicate> getConditionalWithVacationFilter(int employeeIndex, int userIndex, int staffIndex,
			boolean globalFilter, VacationFilterVO filter, CriteriaBuilder cb, From<?, ?> root, Join<?, ?>... join) {
		if (filter == null)
			return null;

		List<Predicate> conditional = new ArrayList<>();

		if (!globalFilter) {
			if (filter.getStartDate() != null && filter.getStartDate().length == 2) {
				conditional.add(cb.greaterThanOrEqualTo(root.get(FIELD_STARTDATE), filter.getStartDate()[0]));
				conditional.add(cb.lessThanOrEqualTo(root.get(FIELD_STARTDATE), filter.getStartDate()[1]));
			}

			if (filter.getEndDate() != null && filter.getEndDate().length == 2) {
				conditional.add(cb.greaterThanOrEqualTo(root.get(FIELD_ENDDATE), filter.getEndDate()[0]));
				conditional.add(cb.lessThanOrEqualTo(root.get(FIELD_ENDDATE), filter.getEndDate()[1]));
			}
		}
		if (filter.getEmployee() != null) {
			List<Predicate> conditionalWithEmployeerFilter = getConditionalWithEmployeeFilter(userIndex, staffIndex,
					globalFilter, filter.getEmployee(), cb, join[employeeIndex], join);
			if (conditionalWithEmployeerFilter != null)
				conditional.addAll(conditionalWithEmployeerFilter);
		}
		return conditional;
	}

	@Override
	protected Path<?> getPathByProperty(Root<?> root, String property, Join<?, ?>... join) {
		if (property.startsWith(String.format("%s.", FIELD_EMPLOYEE))) {
			if (property.startsWith(String.format("%s.%s.", FIELD_EMPLOYEE, FIELD_EMPLOYEE_USER)))
				return join[INDEX_EMPLOYEE_USER].get(property.split("\\.")[2]);

			if (property.startsWith(String.format("%s.%s.", FIELD_EMPLOYEE, FIELD_EMPLOYEE_STAFF)))
				return join[INDEX_EMPLOYEE_STAFF].get(property.split("\\.")[2]);

			return join[INDEX_EMPLOYEE].get(property.split("\\.")[1]);
		}

		return root.get(property);
	}

}
