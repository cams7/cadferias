/**
 * 
 */
package br.com.cams7.cadferias.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.cadferias.model.EmployeePhotoEntity;
import br.com.cams7.cadferias.repository.EmployeePhotoRepository;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class EmployeePhotoServiceImpl implements EmployeePhotoService {

	@Autowired
	private EmployeePhotoRepository repository;

	@Override
	public EmployeePhotoEntity save(EmployeePhotoEntity photo) {
		return repository.save(photo);
	}

}
