import AppointmentStore from '../../data/AppointmentStore';
import DoctorStore from '../../data/DoctorStore';
import SpecialityStore from '../../data/SpecialityStore';
import IAppointment from '../../interfaces/IAppointment';
import EAppointment, { types } from '../../enums/EAppointmentStatus';
import CustomError from '../../utils/CustomError';

interface ICreateAppointmentInput {
  name: IAppointment['name'];
  specie: IAppointment['specie'];
  breed: IAppointment['breed'];
  immediate: IAppointment['immediate'];
  speciality_id: IAppointment['speciality_id'];
}

async function createAppointment({
  name, specie, breed, immediate, speciality_id,
}: ICreateAppointmentInput): Promise<IAppointment | null> {
  const speciality = await SpecialityStore.getById(speciality_id);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { speciality_id });

  const appointment = await AppointmentStore.create(name, specie, breed, immediate, speciality_id);
  appointment.speciality = speciality.name;
  appointment.status = types[appointment.status_id];

  return appointment;
}

async function getAppointmentById(id: number): Promise<IAppointment | null> {
  const appointment = await AppointmentStore.getById(id);
  if (!appointment || appointment.deleted_at !== null)
    throw new CustomError(400, 'Appointment do not exists', true, { id });

  const speciality = await SpecialityStore.getById(appointment.speciality_id);
  appointment.speciality = speciality?.name;
  appointment.status = types[appointment.status_id];
  return appointment;
}

async function getNextAppointmentByDoctorId(id: number): Promise<IAppointment | null> {
  const doctor = await DoctorStore.getById(id);
  if (!doctor || doctor.deleted_at !== null)
    throw new CustomError(400, 'Doctor do not exists', true, { id });

  const appointments = await AppointmentStore.getBySpeciality(doctor.speciality_id);

  let nextAppointment: IAppointment | null = null;
  appointments
    .filter(appoint => (
      appoint.status_id === EAppointment.PENDING && appoint.deleted_at === null
    ))
    .forEach((appoint) => {
      if (nextAppointment !== null) {
        if (appoint.immediate && !nextAppointment.immediate) {
          nextAppointment = appoint;
        } else if (new Date(appoint.created_at).getTime() < new Date (nextAppointment.created_at).getTime()) {
          nextAppointment = appoint;
        }
      } else {
        nextAppointment = appoint;
      }
    });

  if (nextAppointment === null) return null;

  const speciality = await SpecialityStore.getById(nextAppointment!.speciality_id);
  nextAppointment!.speciality = speciality?.name;
  nextAppointment!.status = types[EAppointment.PENDING];
  return nextAppointment;
}

async function getAllAppointment(): Promise<Array<IAppointment>> {
  const appontments = await AppointmentStore.getAll();
  const specialities = await SpecialityStore.getAll();
  return (
    appontments
      .map((appointment) => {
        const speciality = specialities.find(spec => spec.id === appointment.speciality_id);
        appointment.speciality = speciality?.name;
        appointment.status = types[appointment.status_id];
        return appointment;
      })
      .filter(appoint => appoint.deleted_at === null)
  );
}

async function getAllPendingAppointment(): Promise<Array<IAppointment>> {
  const appontments = await AppointmentStore.getAll();
  const specialities = await SpecialityStore.getAll();
  return (
    appontments
      .map((appointment) => {
        const speciality = specialities.find(spec => spec.id === appointment.speciality_id);
        appointment.speciality = speciality?.name;
        appointment.status = types[appointment.status_id];
        return appointment;
      })
      .filter(appoint => appoint.deleted_at === null && appoint.status_id === EAppointment.PENDING)
  );
}

async function getAppointmentBySpeciality(name: string): Promise<Array<IAppointment>> {
  const speciality = await SpecialityStore.getByName(name);
  if (!speciality) throw new CustomError(400, 'Speciality do not exists', true, { name });
  const appontments = await AppointmentStore.getBySpeciality(speciality?.id);
  return (
    appontments
      .map((appointment) => {
        appointment.speciality = speciality.name;
        appointment.status = types[appointment.status_id];
        return appointment;
      })
      .filter(appoint => appoint.deleted_at === null)
  );
}

async function updateAppointmentStatus(id: number, status_id: EAppointment): Promise<IAppointment> {
  const appointment = await AppointmentStore.updateStatus(id, status_id);
  if (!appointment || appointment.deleted_at !== null)
    throw new CustomError(400, 'Appointment do not exists', true, { id });

  const speciality = await SpecialityStore.getById(appointment.speciality_id);
  appointment.speciality = speciality?.name;
  appointment.status = types[appointment.status_id];

  return appointment;
}

async function deleteAppointment(id: number, soft?: boolean): Promise<IAppointment> {
  const xAppointment = soft ? await AppointmentStore.softDelete(id) : await AppointmentStore.delete(id);
  if (!xAppointment) throw new CustomError(400, 'Appointment do not exists', true, { id });

  const speaciality = await SpecialityStore.getById(xAppointment.speciality_id);
  xAppointment.speciality = speaciality?.name;
  xAppointment.status = types[xAppointment.status_id];

  return xAppointment;
}

export default {
  createAppointment,
  getAppointmentById,
  getNextAppointmentByDoctorId,
  getAllAppointment,
  getAllPendingAppointment,
  getAppointmentBySpeciality,
  updateAppointmentStatus,
  deleteAppointment,
};
