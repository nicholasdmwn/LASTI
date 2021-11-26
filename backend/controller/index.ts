import Container, { Service } from 'typedi';
import HealthController from './health';
import { BaseController, Controller } from './base';
import PatientController from './patient';

@Service()
class Controllers {
    healthController: Controller;
    patientController: Controller;

    constructor() {
        this.healthController = Container.get(HealthController);
        this.patientController = Container.get(PatientController);
    }

    getAll(): Controller[] {
        const allControllers = Object.values(this).filter((item) => {
            return item instanceof BaseController;
        });
        return allControllers;
    }
}
export default Controllers;
