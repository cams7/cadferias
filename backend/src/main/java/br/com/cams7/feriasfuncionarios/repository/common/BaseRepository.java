/**
 * 
 */
package br.com.cams7.feriasfuncionarios.repository.common;

import java.io.Serializable;

import br.com.cams7.feriasfuncionarios.model.common.Auditable;
import br.com.cams7.feriasfuncionarios.model.vo.SearchVO;
import br.com.cams7.feriasfuncionarios.model.vo.filter.AuditableFilterVO;
import br.com.cams7.feriasfuncionarios.model.vo.pagination.PageVO;

/**
 * @author ceanm
 *
 */
public interface BaseRepository<E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO> {

	PageVO<E, ID> findBySearch(SearchVO<F> search);
}
