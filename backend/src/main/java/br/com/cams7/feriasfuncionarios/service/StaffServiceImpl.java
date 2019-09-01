/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.model.StaffEntity;
import br.com.cams7.feriasfuncionarios.repository.StaffRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class StaffServiceImpl extends BaseServiceImpl<StaffRepository, StaffEntity, Long> implements StaffService {

}
