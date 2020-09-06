import fs from 'fs';
import path from 'path';
import faker from 'faker';
import SpecialityService from '../service';

const dirPath = path.join(__dirname, '..', '..', '..', 'storage');

describe('speciality.unit.test.ts', () => {
  beforeEach(() => {
    if (!fs.existsSync(dirPath)) return fs.mkdirSync(dirPath);
  });

  afterEach(() => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => fs.unlinkSync(path.join(dirPath, file)));
      fs.rmdirSync(dirPath);
    }
  });

  describe('Function createSpeaciality', () => {
    it('Should create a speciality', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      expect(speciality.id).toEqual(1);
      expect(speciality.name).toEqual(name);
    });

    it('Create a speciality that already exists, should throw an error', async () => {
      const name = faker.name.jobType();
      await SpecialityService.createSpeaciality(name);

      await expect(SpecialityService.createSpeaciality(name)).rejects.toThrow();
    });
  });

  describe('Function getSpeacialityById', () => {
    it('Should return a speciality', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityById(speciality.id);

      expect(spec?.id).toEqual(speciality.id);
      expect(spec?.name).toEqual(speciality.name);
    });

    it('A id that not exists in speciality, should return null', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityById(speciality.id + 1);

      expect(spec).toEqual(null);
    });
  });

  describe('Function getSpeacialityByName', () => {
    it('Should return a speciality', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityByName(name);

      expect(spec?.id).toEqual(speciality.id);
      expect(spec?.name).toEqual(speciality.name);
    });

    it('A name that not exists in speciality, should return null', async () => {
      const name = faker.name.jobType();
      await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityByName(`${name} ${faker.name.jobType()}`);

      expect(spec).toEqual(null);
    });
  });

  describe('Function getAllSpeaciality', () => {
    it('Should return an empty array', async () => {
      const specialities = await SpecialityService.getAllSpeaciality();

      expect(specialities.length).toEqual(0);
    });

    it('Should return array with *n* specialities', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const specs = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => SpecialityService.createSpeaciality(faker.name.jobType()))
      );

      const specialities = await SpecialityService.getAllSpeaciality();

      expect(specialities.length).toEqual(n);
      expect(specialities).toEqual(expect.arrayContaining(specs));
    });
  });

  describe('Function deleteSpeaciality', () => {
    it('Should delete a speciality', async () => {
      const speciality = await SpecialityService.createSpeaciality(faker.name.jobType());
      const xSpeciality = await SpecialityService.deleteSpeaciality(speciality.id);
      const noneSpeciality = await SpecialityService.getSpeacialityById(speciality.id);

      expect(speciality).toEqual(xSpeciality);
      expect(noneSpeciality).toEqual(null);
    });

    it('A id that not exists in speciality, should throw an error', async () => {
      const speciality = await SpecialityService.createSpeaciality(faker.name.jobType());

      await expect(SpecialityService.deleteSpeaciality(speciality.id + 1)).rejects.toThrow();
    });
  });
});
