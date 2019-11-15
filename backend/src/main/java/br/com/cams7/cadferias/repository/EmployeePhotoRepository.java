/**
 * 
 */
package br.com.cams7.cadferias.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.cams7.cadferias.model.EmployeePhotoEntity;

/**
 * @author ceanm
 *
 */
@Repository
public interface EmployeePhotoRepository extends JpaRepository<EmployeePhotoEntity, Long> {

}
