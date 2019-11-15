/**
 * 
 */
package br.com.cams7.cadferias.repository;

import br.com.cams7.cadferias.model.StaffEntity;
import br.com.cams7.cadferias.model.vo.SearchBySelectVO;

/**
 * @author ceanm
 *
 */
public interface StaffRepositoryCustom {

	/**
	 * Busca as equipes que tenham nomes começando com o valor informado
	 * 
	 * @param search Filtro de busca
	 * @return Equipes
	 */
	Iterable<StaffEntity> findByName(SearchBySelectVO search);
}
