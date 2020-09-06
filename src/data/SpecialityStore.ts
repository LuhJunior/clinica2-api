import path from 'path';
import JsonStore from './JsonStore';
import ISpeciality from '../interfaces/ISpeciality';
import { env } from '../config';
import CustomError from '../utils/CustomError';

class SpecialityStore {
  private path: string;

  constructor (path: string) {
    this.path = path;
  }

  create = async (name: string): Promise<ISpeciality> => {
    const exists = await this.getByName(name);
    if (exists) throw new CustomError(400, 'Speciality already exists', true, { name });

    const data: Array<ISpeciality> = JSON.parse(await JsonStore.getJson(this.path) || '[]');
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const speciality: ISpeciality = {
      id, name, created_at: new Date(), updated_at: null, deleted_at: null,
    };

    return JSON.parse(await JsonStore.storeJson(this.path, JSON.stringify(speciality)));
  };

  getById = async (id: number): Promise<ISpeciality | null> => {
    const data: Array<ISpeciality> = JSON.parse(await JsonStore.getJson(this.path));
    return data.find((speciality: ISpeciality) => speciality.id === id) ?? null;
  };

  getByName = async (name: string): Promise<ISpeciality | null> => {
    const data: Array<ISpeciality> = JSON.parse(await JsonStore.getJson(this.path));
    return data.find((speciality: ISpeciality) => speciality.name === name) ?? null;
  };

  getAll = async (): Promise<Array<ISpeciality>> => {
    return JSON.parse(await JsonStore.getJson(this.path));
  };

  delete = async (id: number): Promise<ISpeciality | null> => {
    const data: Array<ISpeciality> = JSON.parse(await JsonStore.getJson(this.path));
    const index = data.findIndex((speciality: ISpeciality) => speciality.id === id);
    if (index !== -1) {
      const xSpeciality: ISpeciality = data.splice(index, 1)[0];
      await JsonStore.rewriteJson(this.path, JSON.stringify(data));
      return xSpeciality;
    }
    return null;
  };
};

export default new SpecialityStore(
  path.join(__dirname, '..', '/storage', env === 'test' ? '/SpecialityTest.json' : '/Speciality.json')
);
