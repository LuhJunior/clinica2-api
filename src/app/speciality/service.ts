import SpecialityStore from '../../data/SpecialityStore';
import ISpeciality from '../../interfaces/ISpeciality';
import CustomError from '../../utils/CustomError';

function createSpeaciality(name: string): Promise<ISpeciality | null> {
  return SpecialityStore.create(name);
}

function getSpeacialityById(id: number): Promise<ISpeciality | null> {
  return SpecialityStore.getById(id);
}

function getAllSpeaciality(): Promise<Array<ISpeciality>> {
  return SpecialityStore.getAll();
}

function getSpeacialityByName(name: string): Promise<ISpeciality | null> {
  return SpecialityStore.getByName(name);
}

async function deleteSpeaciality(id: number): Promise<ISpeciality> {
  const xSpeciality = await SpecialityStore.delete(id);
  if (!xSpeciality) throw new CustomError(400, 'Speciality do not exists', true, { id });
  return xSpeciality;
}

export default {
  createSpeaciality,
  getSpeacialityById,
  getAllSpeaciality,
  getSpeacialityByName,
  deleteSpeaciality,
};
