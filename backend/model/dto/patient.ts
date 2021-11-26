import { Treatment } from '../../common/treatment';

export interface PatientDTO {
    nama: string;
    noTelp: string;
    treatment: Treatment;
}

export interface StatusDTO {
    estimation: number | '?';
    antrian: number;
    patient: PatientDTO;
}

export interface QRCodeDTO {
    image: string;
    id: string;
}
