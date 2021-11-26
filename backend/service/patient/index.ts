import { Service } from 'typedi';
import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';
import { PatientDAO } from '../../model/dao/patient';
import { PatientDTO, StatusDTO } from '../../model/dto/patient';
import { PatientRepository } from '../../repository/patient';
import QRCode from 'qrcode';

@Service()
export class PatientService {
    constructor(private readonly repo: PatientRepository) {}

    async create(item: PatientDTO): Promise<PatientDAO> {
        const entity: PatientDAO = new PatientDAO(item.nama, item.noTelp, item.treatment);
        return await this.repo.create(entity);
    }

    async getStatus(id: string): Promise<StatusDTO> {
        const result = await this.repo.find(id);
        if (!result) {
            throw new StandardError('ID not found.', StatusCodes.BAD_REQUEST);
        }
        const allPatientRecords = await this.repo.getAllPastPatient();
        const resultFinal: StatusDTO = {
            antrian: 0,
            estimation: '?',
            patient: result
        }
        const inqueue = await this.repo.getAllPatient();
        if (inqueue.length > 0) {
            inqueue.forEach((each, index) => {
                if (each.id === id) {
                    resultFinal.antrian = index;
                }
            });
        }

        let total = 0;
        let item = 0;
        if (allPatientRecords.length > 2) {
            allPatientRecords.forEach((each) => {
                if (each.masuk && each.keluar) {
                    item++;
                    total = total + (each.keluar.getTime() - each.masuk.getTime());
                }
            });
            resultFinal.estimation = Math.ceil(total / item);
        }
        return resultFinal;
    }

    async masuk(id: string): Promise<PatientDAO> {
        const result = await this.repo.find(id);
        if (!result) {
            throw new StandardError('ID not found.', StatusCodes.BAD_REQUEST);
        }
        await this.repo.start(id);
        return result;
    }

    async keluar(id: string) {
        const result = await this.repo.find(id);
        if (!result) {
            throw new StandardError('ID not found.', StatusCodes.BAD_REQUEST);
        }
        await this.repo.end(id);
    }

    async generate(link: string): Promise<string> {
        return await QRCode.toDataURL(link, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
        });
    }
}
