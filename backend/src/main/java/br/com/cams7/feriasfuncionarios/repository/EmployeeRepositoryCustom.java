/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository;

import br.com.cams7.feriasfuncionarios.model.EmployeeEntity;
import br.com.cams7.feriasfuncionarios.model.vo.SearchBySelectVO;

/**
 * @author ceanm
 *
 */
public interface EmployeeRepositoryCustom {

	/**
	 * Busca os funcionários que tenham nomes começando com o valor informado
	 * 
	 * @param search Filtro de busca
	 * @return Funcionários
	 */
	Iterable<EmployeeEntity> findByName(SearchBySelectVO search);
}
