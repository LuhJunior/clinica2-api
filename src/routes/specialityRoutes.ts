import { Router } from 'express';

import Speciality from '../app/speciality';

import specialityValidators from '../middlewares/validators/speciality';
import check from '../utils/checkValidation';

const routes = Router();

routes.post('/', specialityValidators.post, check, Speciality.storeSpeciality);

routes.get('/', Speciality.findAllSpeaciality);
routes.get('/:id', specialityValidators.get.id, check, Speciality.findSpecialityById);
routes.get('/name/:name', specialityValidators.get.name, check, Speciality.findSpeacialityByName);

routes.delete('/:id', specialityValidators.delete, check, Speciality.destroySpeaciality);

export default routes;
