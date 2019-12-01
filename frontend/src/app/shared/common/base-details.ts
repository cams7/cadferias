import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase, QUERY_PARAMS } from './component-base';
import { BaseEntity, Link } from '../model/base-entity';
import { HistoryService } from '../history.service';

export abstract class BaseDetails<E extends BaseEntity> extends ComponentBase {

    private _entity: E;

    private _isShowUpdateLink: boolean;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected historyService: HistoryService
    ) {
        super(router);
    }

    ngOnInit() {
        super.ngOnInit();
        this._isShowUpdateLink = !this.historyService.hasPrevious(`${this.url.replace(/\/details$/g, '')}`, this.url);

        this._entity = this.route.snapshot.data['entity'];
    }

    onList() {
        this.router.navigate([`/${this.route.parent.routeConfig.path}`], { queryParams: QUERY_PARAMS });    
    }

    onEdit() {
        this.router.navigate([this.entity.entityId], { relativeTo: this.route.parent });
    }

    abstract get getBySearchRel(): Link;
    abstract get getByIdRel(): Link;
    abstract get deleteRel(): Link;

    get entity() {
        return this._entity;
    }

    get isShowUpdateLink() {
        return this._isShowUpdateLink;
    }
}
