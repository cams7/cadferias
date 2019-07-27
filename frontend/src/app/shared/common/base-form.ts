import { Base } from './base';
import { Observable } from 'rxjs';

export abstract class BaseForm extends Base {

    abstract unchangedData(): Observable<boolean>;
}
