/**
 * 
 */
package br.com.cams7.cadferias.repository;

import br.com.cams7.cadferias.model.EmployeeEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;

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
