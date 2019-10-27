/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import static br.com.cams7.feriasfuncionarios.model.RoleEntity.RoleName.ROLE_USER;
import static br.com.cams7.feriasfuncionarios.model.validator.ImageBase64EncodingValidator.REGEX_IMAGE_BASE64_ENCODING_SEPARATOR;
import static br.com.cams7.feriasfuncionarios.model.validator.ImageBase64EncodingValidator.REGEX_IMAGE_BASE64_ENCODING_WITHOUT_CONTENT;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.error.AppException;
import br.com.cams7.feriasfuncionarios.error.AppInvalidDataException;
import br.com.cams7.feriasfuncionarios.error.AppResourceNotFoundException;
import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.RoleEntity;
import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.EmployeeFilterVO;
import br.com.cams7.feriasfuncionarios.repository.EmployeeRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class EmployeeServiceImpl extends BaseServiceImpl<EmployeeRepository, EmployeeEntity, Long, EmployeeFilterVO>
		implements EmployeeService {

	@Autowired
	private UserService userService;

	@Autowired
	private VacationService vacationService;

	@Override
	public EmployeeEntity create(EmployeeEntity employee) {
		validatePhoto(employee.getPhoto());

		UserEntity user = employee.getUser();

		user.setPassword("12345");
		user.setRoles(Arrays.asList(ROLE_USER).stream().map(roleName -> {
			RoleEntity role = new RoleEntity();
			role.setName(roleName);
			return role;
		}).collect(Collectors.toSet()));
		employee.setUser(userService.create(user));

		final String EMPLOYEE_REGISTRATION = RandomStringUtils.randomAlphanumeric(20).toUpperCase();
		employee.setEmployeeRegistration(EMPLOYEE_REGISTRATION);

		return super.create(employee);
	}
	
	@Override
	public EmployeeEntity update(EmployeeEntity employee) {
		validatePhoto(employee.getPhoto());
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
	public EmployeeEntity geOnlyEmployeeById(Long id) {

		return reporitory.findOnlyEmployeeById(id).orElseThrow(() -> {
			return new AppResourceNotFoundException("Employee.notFound", id);
		});
	}

	@Transactional(readOnly = true)
	@Override
	public Iterable<EmployeeEntity> getByName(SearchBySelectVO search) {
		return reporitory.findByName(search);
	}

	private void validatePhoto(String photo) {
		if (photo != null && !photo.isBlank()) {
			StringTokenizer st = new StringTokenizer(photo, REGEX_IMAGE_BASE64_ENCODING_SEPARATOR);
			String imageType = st.nextToken().replaceFirst(REGEX_IMAGE_BASE64_ENCODING_WITHOUT_CONTENT, "$1");
			String photoBase64Encoding = st.nextToken();

			Base64.Decoder decoder = Base64.getDecoder();

			try {
				byte[] imageBytes = decoder.decode(photoBase64Encoding);

				try (ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes)) {
					BufferedImage bf = ImageIO.read(bis);
					if (bf == null)
						throw new AppInvalidDataException("invalidImage", imageType);
				}
			} catch (IllegalArgumentException | IOException e) {
				throw new AppException(e.getMessage(), e);
			}
		}
	}

}
