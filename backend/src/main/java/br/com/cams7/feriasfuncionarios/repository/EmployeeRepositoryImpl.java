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

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO.AddressFilterVO;
import br.com.cams7.feriasfuncionarios.repository.common.BaseRepositoryImpl;

/**
 * @author ceanm
 *
 */
@Repository
public class EmployeeRepositoryImpl extends BaseRepositoryImpl<EmployeeEntity, Long, EmployeeFilterVO>
		implements EmployeeRepositoryCustom {

	private static final String FIELD_HIRINGDATE = "hiringDate";
	private static final String FIELD_EMPLOYEEREGISTRATION = "employeeRegistration";
	private static final String FIELD_NAME = "name";
	private static final String FIELD_BIRTHDATE = "birthDate";
	private static final String FIELD_PHONENUMBER = "phoneNumber";
	private static final String FIELD_ADDRESS = "address";
	private static final String FIELD_ADDRESS_STREET = "street";
	private static final String FIELD_ADDRESS_NEIGHBORHOOD = "neighborhood";
	private static final String FIELD_ADDRESS_CITY = "city";
	private static final String FIELD_ADDRESS_STATE = "state";
	private static final String FIELD_USER = "user";
	private static final String FIELD_USER_EMAIL = "email";
	private static final String FIELD_STAFF = "staff";
	private static final String FIELD_STAFF_NAME = "name";

	private static final int INDEX_USER = 0;
	private static final int INDEX_STAFF = 1;

	@Override
	protected Join<?, ?>[] getJoin(Root<EmployeeEntity> root, boolean isFetch) {
		List<Join<?, ?>> join = new ArrayList<>();

		join.add(getJoin(root, FIELD_USER, isFetch));
		join.add(getJoin(root, FIELD_STAFF, isFetch));

		return join.toArray(new Join<?, ?>[0]);
	}

	@Override
	protected List<Predicate> getConditionalWithFilter(boolean globalFilter, EmployeeFilterVO filter,
			CriteriaBuilder cb, Root<EmployeeEntity> root, Join<?, ?>... join) {
		return getConditionalWithEmployeeFilter(INDEX_USER, INDEX_STAFF, globalFilter, filter, cb, root, join);
	}

	public static List<Predicate> getConditionalWithEmployeeFilter(int userIndex, int staffIndex, boolean globalFilter,
			EmployeeFilterVO filter, CriteriaBuilder cb, From<?, ?> root, Join<?, ?>... join) {
		if (filter == null)
			return null;

		List<Predicate> conditional = new ArrayList<>();

		if (!globalFilter && filter.getHiringDate() != null && filter.getHiringDate().length == 2) {
			conditional.add(cb.greaterThanOrEqualTo(root.get(FIELD_HIRINGDATE), filter.getHiringDate()[0]));
			conditional.add(cb.lessThanOrEqualTo(root.get(FIELD_HIRINGDATE), filter.getHiringDate()[1]));
		}

		if (isNotBlank(filter.getEmployeeRegistration()))
			conditional.add(cb.like(cb.lower(root.get(FIELD_EMPLOYEEREGISTRATION)),
					getLowerValue2Like(filter.getEmployeeRegistration())));

		if (isNotBlank(filter.getName()))
			conditional.add(cb.like(cb.lower(root.get(FIELD_NAME)), getLowerValue2Like(filter.getName())));

		if (!globalFilter && filter.getBirthDate() != null && filter.getBirthDate().length == 2) {
			conditional.add(cb.greaterThanOrEqualTo(root.get(FIELD_BIRTHDATE), filter.getBirthDate()[0]));
			conditional.add(cb.lessThanOrEqualTo(root.get(FIELD_BIRTHDATE), filter.getBirthDate()[1]));
		}

		if (isNotBlank(filter.getPhoneNumber()))
			conditional.add(cb.like(root.get(FIELD_PHONENUMBER), getValue2Like(filter.getPhoneNumber())));

		AddressFilterVO adress = filter.getAddress();
		if (adress != null) {
			if (isNotBlank(adress.getStreet()))
				conditional.add(cb.like(cb.lower(root.get(FIELD_ADDRESS).get(FIELD_ADDRESS_STREET)),
						getLowerValue2Like(adress.getStreet())));

			if (isNotBlank(adress.getNeighborhood()))
				conditional.add(cb.like(cb.lower(root.get(FIELD_ADDRESS).get(FIELD_ADDRESS_NEIGHBORHOOD)),
						getLowerValue2Like(adress.getNeighborhood())));

			if (isNotBlank(adress.getCity()))
				conditional.add(cb.like(cb.lower(root.get(FIELD_ADDRESS).get(FIELD_ADDRESS_CITY)),
						getLowerValue2Like(adress.getCity())));

			if (!globalFilter && adress.getState() != null)
				conditional.add(cb.equal(root.get(FIELD_ADDRESS).get(FIELD_ADDRESS_STATE), adress.getState()));
		}

		if (join != null && join.length > 0) {
			if (filter.getUser() != null && isNotBlank(filter.getUser().getEmail()))
				conditional.add(cb.like(cb.lower(join[userIndex].get(FIELD_USER_EMAIL)),
						getLowerValue2Like(filter.getUser().getEmail())));

			if (filter.getStaff() != null && isNotBlank(filter.getStaff().getName()))
				conditional.add(cb.like(cb.lower(join[staffIndex].get(FIELD_STAFF_NAME)),
						getLowerValue2Like(filter.getStaff().getName())));

		}
		return conditional;
	}

	@Override
	protected Path<?> getPathByProperty(Root<?> root, String property, Join<?, ?>... join) {
		if (property.startsWith(String.format("%s.", FIELD_USER)))
			return join[INDEX_USER].get(property.split("\\.")[1]);

		if (property.startsWith(String.format("%s.", FIELD_STAFF)))
			return join[INDEX_STAFF].get(property.split("\\.")[1]);

		return root.get(property);
	}

}
