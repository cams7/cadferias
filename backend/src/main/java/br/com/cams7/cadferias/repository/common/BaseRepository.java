/**
 * 
 */
package br.com.cams7.cadferias.repository.common;

import java.io.Serializable;

import br.com.cams7.cadferias.model.common.Auditable;
import br.com.cams7.cadferias.model.vo.SearchVO;
import br.com.cams7.cadferias.model.vo.filter.AuditableFilterVO;
import br.com.cams7.cadferias.model.vo.pagination.PageVO;

/**
 * @author ceanm
 *
 */
public interface BaseRepository<E extends Auditable<ID>, ID extends Serializable, F extends AuditableFilterVO> {

	PageVO<E, ID> findBySearch(SearchVO<F> search);
}
