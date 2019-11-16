/**
 * 
 */
package br.com.cams7.cadferias.service;

import static br.com.cams7.cadferias.model.RoleEntity.ROLE_LIST_ALL_EMPLOYEES;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_LIST_ALL_VACATIONS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_REGISTER_NEW_VACATION;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_UPDATE_VACATION_DATA;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_EMPLOYEE_DETAILS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_STAFF_DETAILS;
import static br.com.cams7.cadferias.model.RoleEntity.ROLE_VIEW_VACATION_DETAILS;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.common.Image;
import br.com.cams7.cadferias.error.AppResourceNotFoundException;
import br.com.cams7.cadferias.model.EmployeeEntity;
import br.com.cams7.cadferias.model.EmployeePhotoEntity;
import br.com.cams7.cadferias.model.RoleEntity;
import br.com.cams7.cadferias.model.UserEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;
import br.com.cams7.cadferias.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.cadferias.repository.EmployeeRepository;
import br.com.cams7.cadferias.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl extends BaseServiceImpl<EmployeeRepository, EmployeeEntity, Long, EmployeeFilterVO>
		implements EmployeeService {

	private static final int PHOTO_WIDTH = 256;
	private static final int PHOTO_HEIGHT = 256;

	private static final String[] ROLES = {
		// @formatter:off
		ROLE_VIEW_STAFF_DETAILS, 
		ROLE_LIST_ALL_EMPLOYEES,
		ROLE_VIEW_EMPLOYEE_DETAILS, 
		ROLE_UPDATE_VACATION_DATA, 
		ROLE_REGISTER_NEW_VACATION, 
		ROLE_LIST_ALL_VACATIONS,
		ROLE_VIEW_VACATION_DETAILS
		// @formatter:on
	};

	@Autowired
	private UserService userService;

	@Autowired
	private VacationService vacationService;

	@Autowired
	private EmployeePhotoService photoService;

	@Transactional(readOnly = true)
	@Override
	public EmployeeEntity getByIdWithoutPhotos(Long employeeId) {
		return reporitory.findByIdWithoutPhotos(employeeId)
				.orElseThrow(() -> new AppResourceNotFoundException("Employee.notFound", employeeId));
	}

	@Override
	public EmployeeEntity create(EmployeeEntity employee) {

		UserEntity user = employee.getUser();

		user.setPassword("12345");
		user.setRoles(Arrays.asList(ROLES).stream().map(name -> {
			RoleEntity role = new RoleEntity();
			role.setName(name);
			return role;
		}).collect(Collectors.toSet()));
		employee.setUser(userService.create(user));

		final String EMPLOYEE_REGISTRATION = RandomStringUtils.randomAlphanumeric(20).toUpperCase();
		employee.setEmployeeRegistration(EMPLOYEE_REGISTRATION);

		employee = super.create(employee);

		addPhoto(employee);

		return employee;
	}

	@Override
	public EmployeeEntity update(EmployeeEntity employee) {
		addPhoto(employee);
		return super.update(employee);
	}

	@Override
	public void delete(Long employeeId) {
		delete(employeeId, true);
	}

	@Override
	public void delete(Long employeeId, boolean deleteUser) {
		if (deleteUser) {
			Long userId = reporitory.findUserIdById(employeeId);
			if (userId != null)
				userService.delete(userId, false);
		}

		Long[] vacationIds = vacationService.getIdsByEmployeeId(employeeId);
		if (vacationIds.length > 0)
			vacationService.deleteAllById(Arrays.asList(vacationIds));

		super.delete(employeeId);
	}

	@Transactional(readOnly = true)
	@Override
	public long countByStaffId(Long staffId) {
		return reporitory.countByStaffId(staffId);
	}

	@Transactional(readOnly = true)
	@Override
	public Iterable<EmployeeEntity> getByName(SearchBySelectVO search) {
		return reporitory.findByName(search);
	}

	private void addPhoto(EmployeeEntity employee) {
		if (employee.getPhotos() != null && !employee.getPhotos().isEmpty()) {
			EmployeePhotoEntity photo = employee.getPhotos().iterator().next();
			byte[] resizedPhoto = Image.resize(photo.getPhoto(), photo.getImageType(), PHOTO_WIDTH, PHOTO_HEIGHT);
			photo.setPhoto(resizedPhoto);
			photo.setEmployee(employee);
			photoService.save(photo);
		}
	}

}
