import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base, QUERY_PARAMS } from './base';
import { BaseEntity, Link } from '../model/base-entity';

export abstract class BaseDetails<E extends BaseEntity> extends Base implements OnInit {

    private _entity: E;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        super();
    }

    ngOnInit() {
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
}
