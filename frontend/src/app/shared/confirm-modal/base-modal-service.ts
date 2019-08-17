import { BsModalRef } from 'ngx-bootstrap/modal';

export abstract class BaseModalService {
    protected bsModalRef: BsModalRef;

    protected close() {
        if(this.bsModalRef) {
            this.bsModalRef.hide();
            this.bsModalRef = undefined;
        }
    }
}