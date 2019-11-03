import { BaseEntity } from './base-entity';
import { Employee } from './employee';

export interface EmployeePhoto extends BaseEntity {
    //Extensão da imagem.
    imageType: ImageType;
    //Foto do funcionário na codificação base 64.
    photo: string;
    //Funcionário do qual pertence a foto.
    employee: Employee;
}
export enum ImageType {
    PNG='PNG',
    JPG='JPG',
    JPEG='JPEG'
}