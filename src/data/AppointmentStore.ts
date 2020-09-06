import path from 'path';
import JsonStore from './JsonStore';
import IAppointment from '../interfaces/IAppointment';
import { env } from '../config';
import EAppointmentStatus from '../enums/EAppointmentStatus';

type createAppointment = (
  name: string,
  specie: string,
  breed: string,
  immediate: boolean,
  speciality_id: number,
) => Promise<IAppointment>;

class AppointmentStore {
  private path: string;

  constructor (path: string) {
    this.path = path;
  }

  create: createAppointment = async (name, specie, breed, immediate, speciality_id) => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path) || '[]');
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const appointment: IAppointment = {
      id,
      name,
      specie,
      breed,
      immediate,
      speciality_id,
      status: EAppointmentStatus.PENDING,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    };

    return JSON.parse(await JsonStore.storeJson(this.path, JSON.stringify(appointment)));
  };

  getById = async (id: number): Promise<IAppointment | null> => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path));
    return data.find((appointment: IAppointment) => appointment.id === id) ?? null;
  };

  getBySpeciality = async (speciality_id: number): Promise<Array<IAppointment>> => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path));
    return data.filter((appointment: IAppointment) => appointment.speciality_id === speciality_id);
  };

  getAll = async (): Promise<Array<IAppointment>> => {
    return JSON.parse(await JsonStore.getJson(this.path));
  };

  updateStatus = async (id: number, status: EAppointmentStatus): Promise<IAppointment | null> => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((appointment: IAppointment) => appointment.id === id);
    if (index !== -1) {
      data[index].status = status;
      data[index].updated_at = new Date();
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return data[index];
    }
    return null;
  }

  delete = async (id: number): Promise<IAppointment | null> => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((appointment: IAppointment) => appointment.id === id);
    if (index !== -1) {
      const xAppointment: IAppointment = data.splice(index, 1)[0];
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return xAppointment;
    }
    return null;
  };
 
  deleteSoft = async (id: number): Promise<IAppointment | null> => {
    const data: Array<IAppointment> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((appointment: IAppointment) => appointment.id === id);
    if (index !== -1) {
      data[index].deleted_at = new Date();
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return data[index];
    }
    return null;
  };
};

export default new AppointmentStore(
  path.join(__dirname, '..', '/storage', env === 'test' ? '/AppointmentTest.json' : '/Appointment.json')
);
