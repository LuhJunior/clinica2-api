import DoctorService from './service';
import TController from '../../types/TController';

const storeDoctor: TController = async (req, res, next) => {
  try {
    const data = await DoctorService.createDoctor(req.body.name, req.body.speciality_id);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findDoctorById: TController = async (req, res, next) => {
  try {
    const data = await DoctorService.getDoctorById(parseInt(req.params.id));
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findAllDoctor: TController = async (req, res, next) => {
  try {
    return res.status(200).send({ ok: true, data: await DoctorService.getAllDoctor() });
  } catch (e) {
    return next(e);
  }
}

const findDoctorBySpeciality: TController = async (req, res, next) => {
  try {
    const data = await DoctorService.getDoctorBySpeciality(req.params.speciality);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const alterDoctor: TController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = await DoctorService.updateDoctor(id, req.body.name, req.body.speciality_id);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const destroyDoctor: TController = async (req, res, next) => {
  try {
    return res.status(200).send({
      ok: true, data: await DoctorService.deleteDoctor(parseInt(req.params.id)),
    });
  } catch (e) {
    return next(e);
  }
}

const softDestroyDoctor: TController = async (req, res, next) => {
  try {
    return res.status(200).send({
      ok: true, data: await DoctorService.deleteDoctor(parseInt(req.params.id), true),
    });
  } catch (e) {
    return next(e);
  }
}

export default {
  storeDoctor,
  findDoctorById,
  findAllDoctor,
  findDoctorBySpeciality,
  alterDoctor,
  destroyDoctor,
  softDestroyDoctor,
};
