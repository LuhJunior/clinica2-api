import { Router } from 'express';

import Doctor from '../app/doctor';

// import validators from '../middlewares/validators';
// import check from '../utils/checkValidation';

const routes = Router();

routes.post('/', /* validators.doctor.post, check, */ Doctor.storeDoctor);

routes.get('/', Doctor.findAllDoctor);
routes.get('/:id', /* validators.doctor.get.id, check, */ Doctor.findDoctorById);
routes.get('/:speciality', /* validators.doctor.get.speciality, check, */ Doctor.getDoctorBySpeciality);

routes.put('/:id', /* validators.doctor.put, check, */ Doctor.alterDoctor);

routes.delete('/:id',/*  validators.doctor.delete, check, */ Doctor.destroyDoctor);
routes.delete('/soft/:id',/*  validators.doctor.delete, check, */ Doctor.softDestroyDoctor);

export default routes;
