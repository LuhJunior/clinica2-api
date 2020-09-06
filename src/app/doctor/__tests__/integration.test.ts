import fs from 'fs';
import path from 'path';
import faker from 'faker';
import request from 'supertest';
import app from '../../../app';

const dirPath = path.join(__dirname, '..', '..', '..', 'storage');

describe('doctor.integration.test.ts', () => {
  beforeEach(() => {
    if (!fs.existsSync(dirPath)) return fs.mkdirSync(dirPath);
  });

  afterEach(() => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => fs.unlinkSync(path.join(dirPath, file)));
      fs.rmdirSync(dirPath);
    }
  });

  describe('POST /api/doctor', () => {
    it('Should create a doctor, with status 200', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const res = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.name).toEqual(docName);
      expect(res.body.data.speciality).toEqual(name);
    });

    it('Create a doctor with a speciality that not exists, should returning a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const res = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id + 1 });

      expect(res.status).toBe(400);
    });

    it('Create a doctor with invalid name, should returning a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.random.number();
      const res = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      expect(res.status).toBe(422);
    });

    it('Create a doctor with 2 chars name, should returning a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 1);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.random.number();
      const res = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      expect(res.status).toBe(422);
    });

    it('Create a doctor with invalid speciality_id, should returning a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      await request(app).post('/api/speciality').send({ name });

      const docName = faker.random.number();
      const res = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: name });

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/doctor/:id', () => {
    it('Should return a doctor, with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      const res = await request(app).get(`/api/doctor/${cRes.body.data.id}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.name).toEqual(docName);
      expect(res.body.data.speciality).toEqual(name);
    });

    it('A get with an id that not exists in doctor, should return null with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      const res = await request(app).get(`/api/doctor/${cRes.body.data.id + 1}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data).toEqual(null);
    });

    it('A get with an invalid id, should return a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      const res = await request(app).get(`/api/doctor/${faker.name.jobArea()}`);

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/doctor/speciality/:speciality', () => {
    it('Should return an array empty array, with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const res = await request(app).get(`/api/doctor/speciality/${name}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(0);
    });

    it('Should return an array of *n* doctors, with 200 status', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const resquests = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => (
            request(app).post('/api/doctor').send({
              name: faker.name.findName().substr(0, 69),
              speciality_id: speciality.id,
            })
          ))
      );

      const res = await request(app).get(`/api/doctor/speciality/${name}`);
      const doctors = resquests.map(r => r.body.data);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(n);
      expect(res.body.data).toEqual(expect.arrayContaining(doctors));
    });

    it('Name that not exists in speciality, sshould return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      const res = await request(app).get(`/api/doctor/speciality/${faker.name.jobType().substr(0, 29)}`);

      expect(res.status).toBe(400);
    });

    it('A get with an invalid speciality name, should return a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });

      const res = await request(app).get(`/api/doctor/speciality/${faker.random.number()}`);

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/doctor', () => {
    it('Should return an empty array, with a 200 status', async () => {
      const res = await request(app).get('/api/doctor');

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(0);
    });

    it('Should return array with *n* doctors, with a 200 status', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const resquests = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => (
            request(app).post('/api/doctor').send({
              name: faker.name.jobType().substr(0, 29),
              speciality_id: speciality.id,
            })
          ))
      );

      const res = await request(app).get('/api/doctor');
      const doctors = resquests.map(r => r.body.data);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(n);
      expect(res.body.data).toEqual(expect.arrayContaining(doctors));
    });
  });

  describe('PUT /api/doctor/:id', () => {
    it('Should update the doctor name, with status 200', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uDocName = faker.name.findName();
      const uRes = await request(app).put(`/api/doctor/${doctor.id}`).send({ name: uDocName });

      const res = await request(app).get(`/api/doctor/${doctor.id}`);
      const uDoctor = res.body.data;

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(uDocName);
      expect(uDoctor?.speciality).toEqual(name);
    });

    it('Should update the doctor speciality, with status 200', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uSpecName = faker.name.jobType().substr(0, 29);
      const sURes = await request(app).post('/api/speciality').send({ name: uSpecName });
      const uSpec = sURes.body.data;

      const uRes = await request(app)
        .put(`/api/doctor/${doctor.id}`)
        .send({ speciality_id: uSpec.id });

      const res = await request(app).get(`/api/doctor/${doctor.id}`);
      const uDoctor = res.body.data;

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(doctor.name);
      expect(uDoctor?.speciality_id).toEqual(uSpec.id);
      expect(uDoctor?.speciality).toEqual(uSpecName);
    });

    it('Should update the doctor name and speciality, with status 200', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uSpecName = faker.name.jobType().substr(0, 29);
      const sURes = await request(app).post('/api/speciality').send({ name: uSpecName });
      const uSpec = sURes.body.data;
      const uDocName = faker.name.findName();

      const uRes = await request(app)
        .put(`/api/doctor/${doctor.id}`)
        .send({
          name: uDocName,
          speciality_id: uSpec.id,
        });

      const res = await request(app).get(`/api/doctor/${doctor.id}`);
      const uDoctor = res.body.data;

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(uDoctor?.id).toEqual(doctor.id);
      expect(uDoctor?.name).toEqual(uDocName);
      expect(uDoctor?.speciality_id).toEqual(uSpec.id);
      expect(uDoctor?.speciality).toEqual(uSpecName);
    });

    it('Speciality that not exists, should return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const res = await request(app)
        .put(`/api/doctor/${doctor.id}`)
        .send({
          speciality_id: sRes.body.data.id + 1,
        });

      expect(res.status).toBe(400);
    });

    it('Doctor that not exists, should return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uSpecName = faker.name.jobType().substr(0, 29);
      const sURes = await request(app).post('/api/speciality').send({ name: uSpecName });
      const uSpec = sURes.body.data;
      const uDocName = faker.name.findName();

      const res = await request(app)
        .put(`/api/doctor/${doctor.id + 1}`)
        .send({
          name: uDocName,
          speciality_id: uSpec.id,
        });

      expect(res.status).toBe(400);
    });

    it('Invalid doctor name, should return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uSpecName = faker.name.jobType().substr(0, 29);
      const sURes = await request(app).post('/api/speciality').send({ name: uSpecName });
      const uSpec = sURes.body.data;

      const res = await request(app)
        .put(`/api/doctor/${doctor.id + 1}`)
        .send({
          name: faker.random.number(),
          speciality_id: uSpec.id,
        });

      expect(res.status).toBe(400);
    });

    it('Invalid speciality_id, should return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const uDocName = faker.name.findName();

      const res = await request(app)
        .put(`/api/doctor/${doctor.id + 1}`)
        .send({
          name: uDocName,
          speciality_id: faker.name.jobType(),
        });

      expect(res.status).toBe(400);
    });

    it('Doctor name and speciality undefined, should a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const res = await request(app).put(`/api/doctor/${doctor.id}`).send({});

      expect(res.status).toBe(422);
    });
  });

  describe('DELETE /api/doctor/:id', () => {
    it('Should delete a doctor, with a 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const xRes = await request(app).delete(`/api/doctor/${doctor.id}`);
      const xDoctor = xRes.body.data;

      const nRes = await request(app).get(`/api/doctor/${doctor.id}`);
      const nonedoctor = nRes.body.data;

      expect(xRes.status).toBe(200);
      expect(xRes.body.ok).toEqual(true);
      expect(doctor).toEqual(xDoctor);
      expect(nonedoctor).toEqual(null);
    });

    it('Should soft delete a doctor, with a 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const xRes = await request(app).delete(`/api/doctor/soft/${doctor.id}`);
      const xDoctor = xRes.body.data;

      const nRes = await request(app).get(`/api/doctor/${doctor.id}`);
      const noneDoctor = nRes.body.data;

      expect(xDoctor.deleted_at).not.toEqual(null);
      delete doctor.deleted_at;
      expect(xDoctor).toEqual(expect.objectContaining(doctor));
      expect(noneDoctor).toEqual(null);
    });

    it('A id that not exists in doctor, return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const xRes = await request(app).delete(`/api/doctor/${doctor.id + 1}`);

      expect(xRes.status).toBe(400);
    });

    it('A invalid id, return a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const sRes = await request(app).post('/api/speciality').send({ name });

      const docName = faker.name.findName().substr(0, 69);
      const cRes = await request(app)
        .post('/api/doctor')
        .send({ name: docName, speciality_id: sRes.body.data.id });
      const doctor = cRes.body.data;

      const xRes = await request(app).delete(`/api/doctor/${faker.name.jobType()}`);

      expect(xRes.status).toBe(422);
    });
  });
});
