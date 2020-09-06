import fs from 'fs';
import path from 'path';
import faker from 'faker';
import request from 'supertest';
import app from '../../../app';

const dirPath = path.join(__dirname, '..', '..', '..', 'storage');

describe('speciality.integration.test.ts', () => {
  beforeEach(() => {
    if (!fs.existsSync(dirPath)) return fs.mkdirSync(dirPath);
  });

  afterEach(() => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => fs.unlinkSync(path.join(dirPath, file)));
      fs.rmdirSync(dirPath);
    }
  });

  describe('POST /api/speciality', () => {
    it('Should create a speciality, with status 200', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const res = await request(app).post('/api/speciality').send({ name });

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.name).toEqual(name);
    });

    it('Create a speciality that already exists, should returning a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      await request(app).post('/api/speciality').send({ name });
      const res = await request(app).post('/api/speciality').send({ name });

      expect(res.status).toBe(400);
    });

    it('Create a speciality with invalid name, should returning a 422 status', async () => {
      const name = faker.random.number();
      await request(app).post('/api/speciality').send({ name });
      const res = await request(app).post('/api/speciality').send({ name });

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/speciality/:id', () => {
    it('Should return a speciality, with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const res = await request(app).get(`/api/speciality/${speciality.id}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.name).toEqual(name);
    });

    it('A get with an id that not exists in speciality, should return null with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const createRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = createRes.body.data;

      const res = await request(app).get(`/api/speciality/${speciality.id + 1}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data).toEqual(null);
    });

    it('A get with an invalid id, should return a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      await request(app).post('/api/speciality').send({ name });
      const res = await request(app).get(`/api/speciality/${name}`);

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/speciality/name/:name', () => {
    it('Should return a speciality, with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const res = await request(app).get(`/api/speciality/name/${speciality.name}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.name).toEqual(name);
    });

    it('A get with an name that not exists in speciality, should return null with 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const createRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = createRes.body.data;

      const res = await request(app).get(`/api/speciality/name/${speciality.name} ${faker.name.jobType()}`);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data).toEqual(null);
    });

    it('A get with an invalid name, should return a 422 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      await request(app).post('/api/speciality').send({ name });
      const res = await request(app).get(`/api/speciality/name/${faker.random.number()}`);

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/speciality', () => {
    it('Should return an empty array, with a 200 status', async () => {
      const res = await request(app).get('/api/speciality');

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(0);
    });

    it('Should return array with *n* specialities', async () => {
      const n = faker.random.number({ min: 0, max: 10 });
      const resquests = await Promise.all(
        Array(n)
          .fill(null)
          .map(() => (
            request(app).post('/api/speciality').send({ name: faker.name.jobType().substr(0, 29) })
          ))
      );

      const res = await request(app).get('/api/speciality');

      const specialities = resquests.map(r => r.body.data);

      expect(res.status).toBe(200);
      expect(res.body.ok).toEqual(true);
      expect(res.body.data.length).toEqual(n);
      expect(res.body.data).toEqual(expect.arrayContaining(specialities));
    });
  });

  describe('DELETE /api/speciality/:id', () => {
    it('Should delete a speciality, with a 200 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const xRes = await request(app).delete(`/api/speciality/${speciality.id}`);
      const xSpeciality = xRes.body.data;

      const nRes = await request(app).get(`/api/speciality/${speciality.id}`);
      const noneSpeciality = nRes.body.data;

      expect(xRes.status).toBe(200);
      expect(xRes.body.ok).toEqual(true);
      expect(speciality).toEqual(xSpeciality);
      expect(noneSpeciality).toEqual(null);
    });

    it('A id that not exists in speciality, return a 400 status', async () => {
      const name = faker.name.jobType().substr(0, 29);
      const cRes  = await request(app).post('/api/speciality').send({ name });
      const speciality = cRes.body.data;

      const xRes = await request(app).delete(`/api/speciality/${speciality.id + 1}`);

      expect(xRes.status).toBe(400);
    });
  });
});
