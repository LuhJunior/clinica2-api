import { Request, Response, NextFunction } from 'express';
import DoctorService from './service';

async function storeDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DoctorService.createDoctor(req.body.nome, req.body.speciality_id);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

async function findDoctorById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DoctorService.getDoctorById(parseInt(req.params.id));
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

async function findAllDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).send({ ok: true, data: await DoctorService.getAllDoctor() });
  } catch (e) {
    return next(e);
  }
}

async function findDoctorBySpeciality(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await DoctorService.getDoctorBySpeciality(req.params.speciality);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

async function alterDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const data = await DoctorService.updateDoctor(id, req.body.nome, req.body.speciality_id);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

async function destroyDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).send({
      ok: true, data: DoctorService.deleteDoctor(parseInt(req.params.id)),
    });
  } catch (e) {
    return next(e);
  }
}

async function softDestroyDoctor(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).send({
      ok: true, data: DoctorService.deleteDoctor(parseInt(req.params.id), true),
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
