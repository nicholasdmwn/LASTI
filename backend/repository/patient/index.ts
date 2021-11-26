import { Service } from 'typedi';
import { IsNull, Not } from 'typeorm';
import { BaseRepository } from '..';
import { PatientDAO } from '../../model/dao/patient';

@Service()
export class PatientRepository extends BaseRepository<PatientDAO> {
    constructor() {
        super();
    }

    async create(item: PatientDAO): Promise<PatientDAO> {
        const repo = await this.getRepository(PatientDAO);
        return await repo.save(item);
    }

    async find(id: string): Promise<PatientDAO | undefined> {
        const repo = await this.getRepository(PatientDAO);

        return await repo.findOne(id);
    }

    async getAllPatient(): Promise<PatientDAO[]> {
        const repo = await this.getRepository(PatientDAO);
        return await repo.find({
            order: { createdAt: 'ASC' },
            where: { masuk: IsNull(), keluar: IsNull() },
        });
    }

    async getAllPastPatient(): Promise<PatientDAO[]> {
        const repo = await this.getRepository(PatientDAO);
        return await repo.find({
            where: { masuk: Not(IsNull()), keluar: Not(IsNull()) },
        });
    }

    async start(id: string) {
        const repo = await this.getRepository(PatientDAO);
        await repo.update({ id }, { masuk: new Date() });
    }

    async end(id: string) {
        const repo = await this.getRepository(PatientDAO);
        await repo.update({ id }, { keluar: new Date() });
    }
}
