import SpecialityService from './service';
import TController from '../../types/TController';

const storeSpeciality: TController = async (req, res, next) => {
  try {
    const data = await SpecialityService.createSpeaciality(req.body.name);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findSpecialityById: TController = async (req, res, next) => {
  try {
    const data = await SpecialityService.getSpeacialityById(parseInt(req.params.id));
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const findAllSpeaciality: TController = async (req, res, next) => {
  try {
    return res.status(200).send({ ok: true, data: await SpecialityService.getAllSpeaciality() });
  } catch (e) {
    return next(e);
  }
}

const findSpeacialityByName: TController = async (req, res, next) => {
  try {
    const data = await SpecialityService.getSpeacialityByName(req.params.name);
    return res.status(200).send({ ok: true, data });
  } catch (e) {
    return next(e);
  }
}

const destroySpeaciality: TController = async (req, res, next) => {
  try {
    return res.status(200).send({
      ok: true, data: await SpecialityService.deleteSpeaciality(parseInt(req.params.id)),
    });
  } catch (e) {
    return next(e);
  }
}

export default {
  storeSpeciality,
  findSpecialityById,
  findAllSpeaciality,
  findSpeacialityByName,
  destroySpeaciality,
};
