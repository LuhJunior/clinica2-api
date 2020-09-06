import AppointmentService from './service';
import EAppointment from '../../enums/EAppointmentStatus';
import TController from '../../types/TController';

const storeAppointment: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.createAppointment(req.body);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findAppointmentById: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.getAppointmentById(parseInt(req.params.id));
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findNextAppointmentByDoctorId: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.getNextAppointmentByDoctorId(parseInt(req.params.doctor_id));
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findAllAppointment: TController = async (req, res, next) => {
  try {
    return res.status(200).send({ ok: true, data: await AppointmentService.getAllAppointment() });
  } catch (e) {
    return next(e);
  }
}

const findAllPendingAppointment: TController = async (req, res, next) => {
  try {
    return res.status(200).send({ ok: true, data: await AppointmentService.getAllPendingAppointment() });
  } catch (e) {
    return next(e);
  }
}

const findAppointmentBySpeciality: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.getAppointmentBySpeciality(req.params.speciality);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const alterAppointmentStatusDone: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.updateAppointmentStatus(
      parseInt(req.params.id),
      EAppointment.DONE
    );
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const alterAppointmentStatusCanceled: TController = async (req, res, next) => {
  try {
    const data = await AppointmentService.updateAppointmentStatus(
      parseInt(req.params.id),
      EAppointment.CANCELED
    );
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const destroyAppointment: TController = async (req, res, next) => {
  try {
    return res.status(200).send({
      ok: true, data: await AppointmentService.deleteAppointment(parseInt(req.params.id)),
    });
  } catch (e) {
    return next(e);
  }
}

const softDestroyAppointment: TController = async (req, res, next) => {
  try {
    return res.status(200).send({
      ok: true, data: await AppointmentService.deleteAppointment(parseInt(req.params.id), true),
    });
  } catch (e) {
    return next(e);
  }
}

export default {
  storeAppointment,
  findAppointmentById,
  findNextAppointmentByDoctorId,
  findAllAppointment,
  findAllPendingAppointment,
  findAppointmentBySpeciality,
  alterAppointmentStatusDone,
  alterAppointmentStatusCanceled,
  destroyAppointment,
  softDestroyAppointment,
};
