import { BaseEntity } from './base-entity';
import { User } from 'src/app/shared/model/user';

export interface Auditable extends BaseEntity {
    //Usuário que criou a entidade.
    createdBy: User;
    //Data de criação da entidade.
    createdDate: Date;
    //Usuário que realizou a última alteração na entidade.
    lastModifiedBy: User;
    //Data da última alteração da entidade.
    lastModifiedDate: Date;
}