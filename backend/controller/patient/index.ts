import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateResponse, ResponseStatus } from '../../model/dto';
import { BaseController, Controller } from '../base';
import AsyncHandler from 'express-async-handler';
import { PatientDTO, QRCodeDTO } from '../../model/dto/patient';
import { PatientService } from '../../service/patient';
import Config from '../../app/config';

@Service()
class PatientController extends BaseController implements Controller {
    basePath = '/patient';

    constructor(private readonly service: PatientService, private readonly config: Config) {
        super();
        this.router.post('/', AsyncHandler(this.create.bind(this)));
        this.router.get('/:id', AsyncHandler(this.getStatus.bind(this)));
        this.router.get('/masuk/:id', AsyncHandler(this.masuk.bind(this)));
        this.router.get('/keluar/:id', AsyncHandler(this.keluar.bind(this)));
    }

    async create(req: Request, res: Response) {
        const item: PatientDTO = req.body;
        const entity = await this.service.create(item);
        const link = await this.service.generate(`${this.config.serverHost}/masuk/${entity.id}`);
        const response: QRCodeDTO = { image: link, id: entity.id };
        res.json(CreateResponse(ResponseStatus.OK, response));
    }

    async masuk(req: Request, res: Response) {
        const entity = await this.service.masuk(req.params.id);
        const link = await this.service.generate(`${this.config.serverHost}/keluar/${entity.id}`);
        const response: QRCodeDTO = { image: link, id: entity.id };
        res.json(CreateResponse(ResponseStatus.OK, response));
    }

    async keluar(req: Request, res: Response) {
        await this.service.keluar(req.params.id);
        res.json(CreateResponse(ResponseStatus.OK));
    }

    async getStatus(req: Request, res: Response) {
        const result = await this.service.getStatus(req.params.id);
        res.json(CreateResponse(ResponseStatus.OK, result));
    }
}

export default PatientController;
