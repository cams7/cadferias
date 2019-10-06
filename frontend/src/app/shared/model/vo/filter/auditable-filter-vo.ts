export interface AuditableFilterVO {
    //E-mail do usuário que criou a entidade.
    emailOfCreatedBy: string;
    //Data de criação da entidade.
    createdDate: Date[];

    //E-mail do usuário que realizou a última alteração na entidade.
    emailOfLastModifiedBy: string;
    //Data da última alteração da entidade.
    lastModifiedDate: Date[];
}

export enum FilterType {
    EMPLOYEE,
    VACATION,
    STAFF
}