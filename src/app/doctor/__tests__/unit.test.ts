import fs from 'fs';
import path from 'path';
import faker from 'faker';
import DoctorService from '../service';
import SpecialityService from '../../speciality/service';

const dirPath = path.join(__dirname, '..', '..', '..', 'storage');

describe('doctor.unit.test.ts', () => {
  beforeEach(() => {
    if (!fs.existsSync(dirPath)) return fs.mkdirSync(dirPath);
  });

  afterEach(() => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => fs.unlinkSync(path.join(dirPath, file)));
      fs.rmdirSync(dirPath);
    }
  });

  describe('Function createDoctor', () => {
    it('Should create a doctor', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      expect(doctor?.id).toEqual(1);
      expect(doctor?.name).toEqual(docName);
      expect(doctor?.speciality).toEqual(name);
    });

    it('Create a doctor with a speciality that not exists, should throw an error', async () => {
      const docName = faker.name.findName();

      await expect(DoctorService.createDoctor(docName, 1)).rejects.toThrow();
    });
  });

  describe('Function getDoctorById', () => {
    it('Should return a doctor', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const doc = await DoctorService.getDoctorById(doctor.id);

      expect(doc?.id).toEqual(doctor.id);
      expect(doc?.name).toEqual(docName);
      expect(doc?.speciality).toEqual(name);
    });

    it('A id that not exists in doctor, should return null', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const doc = await DoctorService.getDoctorById(doctor.id + 1);

      expect(doc).toEqual(null);
    });

    it('A id of a soft deleted doctor, should return null', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);
      await DoctorService.deleteDoctor(doctor.id, true);

      const doc = await DoctorService.getDoctorById(doctor.id);

      expect(doc).toEqual(null);
    });
  });

  describe('Function getDoctorBySpeciality', () => {
    it('Should return an array of *n* doctors', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);
      
      const docs = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => DoctorService.createDoctor(faker.name.findName(), speciality.id))
      );

      const doctors = await DoctorService.getDoctorBySpeciality(name);

      expect(doctors.length).toEqual(n);
      expect(doctors).toEqual(expect.arrayContaining(docs));
    });

    it('With a speciality that not exists, should throw an error', async () => {
      const name = faker.name.jobType();

      await expect(DoctorService.getDoctorBySpeciality(name)).rejects.toThrow();
    });
  });

  describe('Function getAllDoctor', () => {
    it('Should return an empty array', async () => {
      const doctors = await DoctorService.getAllDoctor();

      expect(doctors.length).toEqual(0);
    });

    it('Should return an array of *n* doctors', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);
      
      const docs = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => DoctorService.createDoctor(faker.name.findName(), speciality.id))
      );

      const doctors = await DoctorService.getAllDoctor();

      expect(doctors.length).toEqual(n);
      expect(doctors).toEqual(expect.arrayContaining(docs));
    });
  });

  describe('Function updateDoctor', () => {
    it('Should update the doctor name', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const uDocName = faker.name.findName();
      await DoctorService.updateDoctor(doctor.id, uDocName);
      const uDoctor = await DoctorService.getDoctorById(doctor.id);

      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(uDocName);
      expect(uDoctor?.speciality).toEqual(name);
    });

    it('Should update the doctor speciality', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const uSpecName = faker.name.jobType();
      const uSpec = await SpecialityService.createSpeaciality(uSpecName);

      await DoctorService.updateDoctor(doctor.id, undefined, uSpec.id);
      const uDoctor = await DoctorService.getDoctorById(doctor.id);

      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(doctor.name);
      expect(uDoctor?.speciality_id).toEqual(uSpec.id);
      expect(uDoctor?.speciality).toEqual(uSpecName);
    });

    it('Should update the doctor name and speciality', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const uSpecName = faker.name.jobType();
      const uSpec = await SpecialityService.createSpeaciality(uSpecName);
      const uDocName = faker.name.findName();

      await DoctorService.updateDoctor(doctor.id, uDocName, uSpec.id);
      const uDoctor = await DoctorService.getDoctorById(doctor.id);

      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(uDocName);
      expect(uDoctor?.speciality_id).toEqual(uSpec.id);
      expect(uDoctor?.speciality).toEqual(uSpecName);
    });

    it('Update with the doctor name and speciality undefined, should return null', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      expect(await DoctorService.updateDoctor(doctor.id, undefined, undefined)).toEqual(null);
    });

    it('Update a doctor with a speciality that not exists, should throw an error', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      await expect(DoctorService.updateDoctor(doctor.id, undefined, speciality.id + 1)).rejects.toThrow();
    });

    it('Update a doctor that not exists, should throw an error', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const uSpecName = faker.name.jobType();
      const uSpec = await SpecialityService.createSpeaciality(uSpecName);

      await expect(DoctorService.updateDoctor(doctor.id + 1, undefined, uSpec.id)).rejects.toThrow();
    });
  });

  describe('Function deleteDoctor', () => {
    it('Should delete a doctor', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const xDoctor = await DoctorService.deleteDoctor(doctor.id);
      const noneDoctor = await DoctorService.getDoctorById(doctor.id);

      expect(doctor).toEqual(xDoctor);
      expect(noneDoctor).toEqual(null);
    });

    it('Should soft delete a doctor', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      const xDoctor = await DoctorService.deleteDoctor(doctor.id, true);
      const noneDoctor = await DoctorService.getDoctorById(doctor.id);

      expect(xDoctor.deleted_at).not.toEqual(null);
      delete doctor.deleted_at;
      expect(xDoctor).toEqual(expect.objectContaining(doctor));
      expect(noneDoctor).toEqual(null);
    });

    it('A id that not exists in doctor, should throw an error', async () => {
      const name = faker.name.jobType();
      const speciality = await SpecialityService.createSpeaciality(name);

      const docName = faker.name.findName();
      const doctor = await DoctorService.createDoctor(docName, speciality.id);

      await expect(DoctorService.deleteDoctor(doctor.id + 1)).rejects.toThrow();
    });
  });
});
