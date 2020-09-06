import fs from 'fs';
import path from 'path';
import faker from 'faker';
import SpecialityService from '../service';

describe('speciality.unit.test.ts', () => {
  /* beforeAll(async () => {
    try {
        
    } catch (e) {
    }
  });

  afterAll(async () => {
    try {
    } catch (e) {
    }
  }); */
  /* beforeEach(() => {
    return fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'storage'));
  });

  afterEach(() => {
    return fs.rmdirSync(path.join(__dirname, '..', '..', '..', 'storage'), { recursive: true });
  }); */

  describe('Function createSpeaciality', () => {
    it('Should create a speciality', async () => {
      const name = faker.name.jobTitle();
      const speciality = await SpecialityService.createSpeaciality(name);

      expect(speciality.id).toEqual(1);
      expect(speciality.name).toEqual(name);
    });

    it('Create a speciality that already exists, should throw an error', async () => {
      const name = faker.name.jobTitle();
      await SpecialityService.createSpeaciality(name);

      await expect(SpecialityService.createSpeaciality(name)).rejects.toThrow();
    });
  });

  describe('Function getSpeacialityById', () => {
    it('Should return a speciality', async () => {
      const name = faker.name.jobTitle();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityById(speciality.id);

      expect(spec?.id).toEqual(speciality.id);
      expect(spec?.name).toEqual(speciality.name);
    });

    it('A id that not exists in speciality, should return null', async () => {
      const name = faker.name.jobTitle();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityById(speciality.id + 1);

      expect(spec).toBe(null);
    });
  });

  describe('Function getSpeacialityByName', () => {
    it('Should return a speciality', async () => {
      const name = faker.name.jobTitle();
      const speciality = await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityByName(name);

      expect(spec?.id).toEqual(speciality.id);
      expect(spec?.name).toEqual(speciality.name);
    });

    it('A name that not exists in speciality, should return null', async () => {
      const name = faker.name.jobTitle();
      await SpecialityService.createSpeaciality(name);
      const spec = await SpecialityService.getSpeacialityByName(`${name} ${faker.name.jobType()}`);

      expect(spec).toBe(null);
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
          .fill((() => SpecialityService.createSpeaciality(faker.name.jobTitle()))())
      );

      const specialities = await SpecialityService.getAllSpeaciality();

      expect(specialities.length).toEqual(n);
      expect(specialities).toContain(specs);
    });
  });

  describe('Function deleteSpeaciality', () => {
    it('Should delete a speciality', async () => {
      const speciality = await SpecialityService.createSpeaciality(faker.name.jobTitle());
      const xSpeciality = await SpecialityService.deleteSpeaciality(speciality.id);
      const noneSpeciality = await SpecialityService.getSpeacialityById(speciality.id);

      expect(speciality).toBe(xSpeciality);
      expect(noneSpeciality).toBe(null);
    });

    it('A id that not exists in speciality, should throw an error', async () => {
      const speciality = await SpecialityService.createSpeaciality(faker.name.jobTitle());

      await expect(SpecialityService.deleteSpeaciality(speciality.id + 1)).rejects.toThrow();
    });
  });
});
