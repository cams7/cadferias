/**
 * 
 */
package br.com.cams7.feriasfuncionarios.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cams7.feriasfuncionarios.model.UserEntity;
import br.com.cams7.feriasfuncionarios.repository.UserRepository;
import br.com.cams7.feriasfuncionarios.service.common.BaseServiceImpl;

/**
 * @author ceanm
 *
 */
@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, Long> implements UserService {

}
