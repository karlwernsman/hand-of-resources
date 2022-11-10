const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /dogs should return a list of dogs', async () => {
    const resp = await request(app).get('/dogs');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(5);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 4,
          "breed": "Pit Mix",
          "id": "1",
          "name": "Lottie",
        },
        Object {
          "age": 10,
          "breed": "Pit Mix",
          "id": "2",
          "name": "Rudy",
        },
        Object {
          "age": 2,
          "breed": "Min Pin",
          "id": "3",
          "name": "Laikia",
        },
        Object {
          "age": 4,
          "breed": "German Shorthair",
          "id": "4",
          "name": "Lucy",
        },
        Object {
          "age": 12,
          "breed": "Super Mutt",
          "id": "5",
          "name": "Rascal",
        },
      ]
    `);
  });
  it('GET /dogs:id should return a dogs details', async () => {
    const resp = await request(app).get('/dogs');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 4,
          "breed": "Pit Mix",
          "id": "1",
          "name": "Lottie",
        },
        Object {
          "age": 10,
          "breed": "Pit Mix",
          "id": "2",
          "name": "Rudy",
        },
        Object {
          "age": 2,
          "breed": "Min Pin",
          "id": "3",
          "name": "Laikia",
        },
        Object {
          "age": 4,
          "breed": "German Shorthair",
          "id": "4",
          "name": "Lucy",
        },
        Object {
          "age": 12,
          "breed": "Super Mutt",
          "id": "5",
          "name": "Rascal",
        },
      ]
    `);
  });
  it('POST /dogs should create a new dog', async () => {
    const newDog = {
      name: 'Katie',
      age: 11,
      breed: 'Chihuahua',
    };
    const resp = await request(app).post('/dogs').send(newDog);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newDog,
    });
  });
  it('PUT /dogs/:id should update an existing dog', async () => {
    const resp = await await request(app).put('/dogs/1').send({
      breed: 'Staffy Mix',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.breed).toBe('Staffy Mix');
  });
  it('DELETE /dogs/:id should delete a dog', async () => {
    const resp = await request(app).delete('/dogs/1');
    expect(resp.status).toBe(200);

    const dogResp = await request(app).get('/dogs/1');
    expect(dogResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
