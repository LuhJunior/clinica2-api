import path from 'path';
import JsonStore from './JsonStore';
import IDoctor from '../interfaces/IDoctor';
import { env } from '../config';

class DoctorStore {
  path: string;

  constructor (path: string) {
    this.path = path;
  }

  create = async (nome: string, speciality_id: number): Promise<IDoctor> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path) || '[]');
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const doctor: IDoctor = {
      id,
      nome,
      speciality_id,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    };

    return JSON.parse(await JsonStore.storeJson(this.path, JSON.stringify(doctor)));
  };

  getById = async (id: number): Promise<IDoctor | null> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path));
    return data.find((doctor: IDoctor) => doctor.id === id) ?? null;
  };

  getBySpeciality = async (speciality_id: number): Promise<Array<IDoctor>> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path));
    return data.filter((doctor: IDoctor) => doctor.speciality_id === speciality_id);
  };

  getAll = async (): Promise<Array<IDoctor>> => {
    return JSON.parse(await JsonStore.getJson(this.path));
  };

  update = async (id: number, docData: { nome?: string, speciality_id?: number }): Promise<IDoctor | null> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((doctor: IDoctor) => doctor.id === id);
    if (index !== -1) {
      if (docData.nome) data[index].nome = docData.nome;
      if (docData.speciality_id) data[index].speciality_id = docData.speciality_id;
      data[index].updated_at = new Date();
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return data[index];
    }
    return null;
  }

  delete = async (id: number): Promise<IDoctor | null> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((doctor: IDoctor) => doctor.id === id);
    if (index !== -1) {
      const xDoctor = data.splice(index, 1);
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return xDoctor[0];
    }
    return null;
  };
 
  deleteSoft = async (id: number): Promise<IDoctor | null> => {
    const data: Array<IDoctor> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((doctor: IDoctor) => doctor.id === id);
    if (index !== -1) {
      data[index].deleted_at = new Date();
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return data[index];
    }
    return null;
  };
};

export default new DoctorStore(
  path.join(__dirname, '..', '/storage', env === 'test' ? '/DoctorTest.json' : '/Doctor.json')
);
