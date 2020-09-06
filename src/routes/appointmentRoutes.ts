import { Router } from 'express';

import Appointment from '../app/appointment';

import appointmentValidators from '../middlewares/validators/appointment';
import check from '../utils/checkValidation';

const routes = Router();

routes.post('/', appointmentValidators.post, check, Appointment.storeAppointment);

routes.get('/', Appointment.findAllAppointment);
routes.get('/pending', Appointment.findAllPendingAppointment);
routes.get('/:id', appointmentValidators.get.id, check, Appointment.findAppointmentById);
routes.get(
  '/next/:doctor_id',
  appointmentValidators.get.doctor,
  check,
  Appointment.findNextAppointmentByDoctorId
);
routes.get(
  '/speciality/:speciality',
  appointmentValidators.get.speciality,
  check,
  Appointment.findAppointmentBySpeciality
);

routes.put('/done/:id', appointmentValidators.put, check, Appointment.alterAppointmentStatusDone);
routes.put('/cancel/:id', appointmentValidators.put, check, Appointment.alterAppointmentStatusCanceled);

routes.delete('/:id', appointmentValidators.delete, check, Appointment.destroyAppointment);
routes.delete('/soft/:id', appointmentValidators.delete, check, Appointment.softDestroyAppointment);

export default routes;
