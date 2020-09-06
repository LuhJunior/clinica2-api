import DoctorStore from '../../data/DoctorStore';
import SpecialityStore from '../../data/SpecialityStore';
import IDoctor from '../../interfaces/IDoctor';
import CustomError from '../../utils/CustomError';

async function createDoctor(name: string, speciality_id: number): Promise<IDoctor> {
  const speciality = await SpecialityStore.getById(speciality_id);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { speciality_id });

  const doctor = await DoctorStore.create(name, speciality_id);
  doctor.speciality = speciality.name;
  return doctor;
}

async function getDoctorById(id: number): Promise<IDoctor | null> {
  const doctor = await DoctorStore.getById(id);
  if (!doctor || doctor.deleted_at !== null) return null;

  const speaciality = await SpecialityStore.getById(doctor.speciality_id);
  doctor.speciality = speaciality?.name;
  return doctor;
}

async function getAllDoctor(): Promise<Array<IDoctor>> {
  const specialities = await SpecialityStore.getAll();
  const doctors = await DoctorStore.getAll();
  return (
    doctors
      .map((doctor) => {
        const speciality = specialities.find(spec => spec.id === doctor.speciality_id);
        doctor.speciality = speciality?.name;
        return doctor;
      })
      .filter(doc => doc.deleted_at === null)
  );
}

async function getDoctorBySpeciality(name: string): Promise<Array<IDoctor>> {
  const speciality = await SpecialityStore.getByName(name);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { name });
  const doctors = await DoctorStore.getBySpeciality(speciality.id);
  return (
    doctors
      .map((doctor) => ({ ...doctor, speciality: speciality.name }))
      .filter(doc => doc.deleted_at === null)
  );
}

async function updateDoctor(
  id: number, name?: string, speciality_id?: number
): Promise<IDoctor | null> {
  if (!name && !speciality_id) return null;
  if (speciality_id) {
    const speciality = await SpecialityStore.getById(speciality_id);
    if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { speciality_id });

    const doctor = await DoctorStore.update(id, name, speciality_id);
    if (!doctor || doctor.deleted_at !== null)
      throw new CustomError(400, 'Doctor do not exists', true, { id });

    doctor.speciality = speciality.name;
    return doctor;
  }
  const doctor = await DoctorStore.update(id, name);
  if (!doctor) throw new CustomError(400, 'Doctor do not exists', true, { id });
  const spec = await SpecialityStore.getById(doctor.speciality_id);
  doctor.speciality = spec?.name;
  return doctor;
}

async function deleteDoctor(id: number, soft?: boolean): Promise<IDoctor> {
  const xDoctor = soft ? await DoctorStore.softDelete(id) : await DoctorStore.delete(id);
  if (!xDoctor) throw new CustomError(400, 'Doctor do not exists', true, { id });

  const speaciality = await SpecialityStore.getById(xDoctor.speciality_id);
  xDoctor.speciality = speaciality?.name;
  return xDoctor;
}

export default {
  createDoctor,
  getDoctorById,
  getAllDoctor,
  getDoctorBySpeciality,
  updateDoctor,
  deleteDoctor,
};
