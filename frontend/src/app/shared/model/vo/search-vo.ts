import { AuditableFilterVO } from './filter/auditable-filter-vo';
import { PageInputVO } from './pagination/page-input-vo';

export interface SearchVO<F extends AuditableFilterVO> {
    searchFilter: F;
    pageInput: PageInputVO;
    globalFilter: boolean;
}