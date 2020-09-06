import { Router } from 'express';

import Doctor from '../app/doctor';

import doctorValidators from '../middlewares/validators/doctor';
import check from '../utils/checkValidation';

const routes = Router();

routes.post('/', doctorValidators.post, check, Doctor.storeDoctor);

routes.get('/', Doctor.findAllDoctor);
routes.get('/:id', doctorValidators.get.id, check, Doctor.findDoctorById);
routes.get('/speciality/:speciality', doctorValidators.get.speciality, check, Doctor.findDoctorBySpeciality);

routes.put('/:id', doctorValidators.put, check, Doctor.alterDoctor);

routes.delete('/:id', doctorValidators.delete, check, Doctor.destroyDoctor);
routes.delete('/soft/:id', doctorValidators.delete, check, Doctor.softDestroyDoctor);

export default routes;
