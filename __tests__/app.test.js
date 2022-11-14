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
          "name": "Laika",
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
    const resp = await request(app).get('/dogs/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "age": 4,
        "breed": "Pit Mix",
        "id": "1",
        "name": "Lottie",
      }
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
    const resp = await request(app).put('/dogs/1').send({
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
});

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /cats should return a list of cats', async () => {
    const resp = await request(app).get('/cats');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(6);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 4,
          "color": "Tortiouse",
          "id": "1",
          "name": "Scooter",
        },
        Object {
          "age": 8,
          "color": "Black",
          "id": "2",
          "name": "Simon",
        },
        Object {
          "age": 6,
          "color": "Black and White",
          "id": "3",
          "name": "Harry",
        },
        Object {
          "age": 1,
          "color": "Tabby",
          "id": "4",
          "name": "Dino",
        },
        Object {
          "age": 7,
          "color": "Orange",
          "id": "5",
          "name": "Harold",
        },
        Object {
          "age": 20,
          "color": "Cream",
          "id": "6",
          "name": "Ghost",
        },
      ]
    `);
  });
  it('GET /cats:id should return a cats details', async () => {
    const resp = await request(app).get('/cats/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "age": 4,
        "color": "Tortiouse",
        "id": "1",
        "name": "Scooter",
      }
    `);
  });
  it('POST /cats should create a new cat', async () => {
    const newCat = {
      name: 'Edna',
      age: 3,
      color: 'Gray',
    };
    const resp = await request(app).post('/cats').send(newCat);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCat,
    });
  });
  it('PUT /cats/:id should update an existing cat', async () => {
    const resp = await request(app).put('/cats/1').send({
      age: 3,
    });
    expect(resp.status).toBe(200);
    expect(resp.body.age).toBe(3);
  });
  it('DELETE /cats/:id should delete cat', async () => {
    const resp = await request(app).delete('/cats/1');
    expect(resp.status).toBe(200);

    const catResp = await request(app).get('/cats/1');
    expect(catResp.status).toBe(404);
  });
});

describe('mountain routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /mountains should return a list of mountains', async () => {
    const resp = await request(app).get('/mountains');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(6);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "height_in_feet": 29035,
          "id": "1",
          "location": "Nepal/Tibet",
          "name": "Everest",
        },
        Object {
          "height_in_feet": 28250,
          "id": "2",
          "location": "Pakistan/China",
          "name": "K2",
        },
        Object {
          "height_in_feet": 28169,
          "id": "3",
          "location": "India/Nepal",
          "name": "Kanchenjunga",
        },
        Object {
          "height_in_feet": 27940,
          "id": "4",
          "location": "Nepal/Tibet",
          "name": "Lhotse I",
        },
        Object {
          "height_in_feet": 27766,
          "id": "5",
          "location": "Nepal/Tibet",
          "name": "Makalu I",
        },
        Object {
          "height_in_feet": 26906,
          "id": "6",
          "location": "Nepal/Tibet",
          "name": "Cho Oyu",
        },
      ]
    `);
  });
});

afterAll(() => {
  pool.end();
});
