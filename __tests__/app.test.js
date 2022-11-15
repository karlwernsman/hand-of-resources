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
  it('GET /mountains:id should return a mountains details', async () => {
    const resp = await request(app).get('/mountains/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "height_in_feet": 29035,
        "id": "1",
        "location": "Nepal/Tibet",
        "name": "Everest",
      }
    `);
  });
  it('POST /mountains should create a new mountain', async () => {
    const newMountain = {
      name: 'Dhaulagiri I',
      height_in_feet: 26795,
      location: 'Nepal',
    };
    const resp = await request(app).post('/mountains').send(newMountain);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newMountain,
    });
  });
  it('PUT /mountains/:id should update an existing mountain', async () => {
    const resp = await request(app).put('/mountains/1').send({
      name: 'Mt Everest',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Mt Everest');
  });
  it('DELETE /mountains/:id should delete a mountain', async () => {
    const resp = await request(app).delete('/mountains/1');
    expect(resp.status).toBe(200);

    const mountainResp = await request(app).get('/mountains/1');
    expect(mountainResp.status).toBe(404);
  });
});

describe('flower routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /flowers should return a list of flowers', async () => {
    const resp = await request(app).get('/flowers');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(6);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "Daisy",
          "soil_needs": "Well-drained",
          "sun_needs": "Full Sun",
        },
        Object {
          "id": "2",
          "name": "Periwinkle",
          "soil_needs": "Droughty",
          "sun_needs": "Full Sun/Partial Shade",
        },
        Object {
          "id": "3",
          "name": "Dahlia",
          "soil_needs": "Well-drained",
          "sun_needs": "Full Sun",
        },
        Object {
          "id": "4",
          "name": "Foxglove",
          "soil_needs": "Well-drained",
          "sun_needs": "All Sun Types",
        },
        Object {
          "id": "5",
          "name": "Pearly Everlasting",
          "soil_needs": "Damp",
          "sun_needs": "Full Sun/Partial Shade",
        },
        Object {
          "id": "6",
          "name": "Moonflower",
          "soil_needs": "Well-drained",
          "sun_needs": "Full Sun",
        },
      ]
    `);
  });
  it('GET /flowers:id should return a flowers details', async () => {
    const resp = await request(app).get('/flowers/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "name": "Daisy",
        "soil_needs": "Well-drained",
        "sun_needs": "Full Sun",
      }
    `);
  });
  it('POST /flowers should create a new flower', async () => {
    const newFlower = {
      name: 'Hyacinth',
      sun_needs: 'Full Sun',
      soil_needs: 'Well-drained',
    };
    const resp = await request(app).post('/flowers').send(newFlower);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newFlower,
    });
  });
  it('PUT /flowers/:id should update an existing flower', async () => {
    const resp = await request(app).put('/flowers/1').send({
      name: 'Daisy!',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Daisy!');
  });
  it('DELETE /flowers/:id should delete a flower', async () => {
    const resp = await request(app).delete('/flowers/1');
    expect(resp.status).toBe(200);

    const flowerResp = await request(app).get('/flowers/1');
    expect(flowerResp.status).toBe(404);
  });
});

describe('color routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /colors should return a list of colors', async () => {
    const resp = await request(app).get('/colors');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(6);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "meaning": "Passion",
          "name": "Red",
          "thing": "Apple",
        },
        Object {
          "id": "2",
          "meaning": "Happiness",
          "name": "Pink",
          "thing": "Cat nose",
        },
        Object {
          "id": "3",
          "meaning": "Growth",
          "name": "Green",
          "thing": "Grass",
        },
        Object {
          "id": "4",
          "meaning": "Peace",
          "name": "Blue",
          "thing": "Sky",
        },
        Object {
          "id": "5",
          "meaning": "Purity",
          "name": "White",
          "thing": "Cloud",
        },
        Object {
          "id": "6",
          "meaning": "Reliable",
          "name": "Brown",
          "thing": "Chocolate",
        },
      ]
    `);
  });
  it('GET /colors:id should return a colors details', async () => {
    const resp = await request(app).get('/colors/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "meaning": "Passion",
        "name": "Red",
        "thing": "Apple",
      }
    `);
  });
});

afterAll(() => {
  pool.end();
});
