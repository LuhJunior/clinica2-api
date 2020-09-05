import DoctorStore from '../../data/DoctorStore';
import SpecialityStore from '../../data/SpecialityStore';
import IDoctorResponse from '../../interfaces/IDoctorResponse';
import CustomError from '../../utils/CustomError';

async function createDoctor(nome: string, speciality_id: number): Promise<IDoctorResponse | null> {
  const speciality = await SpecialityStore.getById(speciality_id);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { speciality_id });
  const doctor = await DoctorStore.create(nome, speciality_id);
  return ({
    ...doctor,
    especialidade: speciality.nome,
  });
}

async function getDoctorById(id: number): Promise<IDoctorResponse | null> {
  const doctor = await DoctorStore.getById(id);
  if (!doctor) return null;
  const speaciality = await SpecialityStore.getById(doctor.speciality_id);
  return ({
    ...doctor,
    especialidade: speaciality?.nome ?? '',
  });
}

async function getAllDoctor(): Promise<Array<IDoctorResponse>> {
  const specialities = await SpecialityStore.getAll();
  const doctors = await DoctorStore.getAll();
  return doctors.map((doctor) => {
    const speciality = specialities.find(spec => spec.id === doctor.speciality_id);
    return ({
      ...doctor,
      especialidade: speciality?.nome ?? '',
    });
  });
}

async function getDoctorBySpeciality(nome: string): Promise<Array<IDoctorResponse>> {
  const speciality = await SpecialityStore.getByNome(nome);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { nome });
  const doctors = await DoctorStore.getBySpeciality(speciality.id);
  return doctors.map((doctor) => ({ ...doctor, especialidade: speciality.nome }));
}

async function updateDoctor(
  id: number, nome?: string, speciality_id?: number
): Promise<IDoctorResponse | null> {
  if (!nome && !speciality_id) return null;
  if (speciality_id) {
    const speciality = await SpecialityStore.getById(speciality_id);
    if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { speciality_id });
    const doctor = await DoctorStore.update(id, nome, speciality_id);
    if (!doctor) throw new CustomError(400, 'Doctor do not exists', true, { id });
    return ({
      ...doctor,
      especialidade: speciality?.nome ?? '',
    });
  }
  const doctor = await DoctorStore.update(id, nome);
  if (!doctor) throw new CustomError(400, 'Doctor do not exists', true, { id });
  const spec = await SpecialityStore.getById(doctor.speciality_id);
  return ({
    ...doctor,
    especialidade: spec?.nome ?? '',
  });
}

async function deleteDoctor(id: number, soft?: boolean): Promise<IDoctorResponse> {
  const xDoctor = soft ? await DoctorStore.delete(id) : await DoctorStore.softDelete(id);
  if (!xDoctor) throw new CustomError(400, 'Doctor do not exists', true, { id });
  const speaciality = await SpecialityStore.getById(xDoctor.id);
  return ({
    ...xDoctor,
    especialidade: speaciality?.nome ?? '',
  });
}

export default {
  createDoctor,
  getDoctorById,
  getAllDoctor,
  getDoctorBySpeciality,
  updateDoctor,
  deleteDoctor,
};
