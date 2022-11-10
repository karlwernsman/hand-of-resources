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
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number),
      breed: expect.any(String),
    });
  });
  it('GET /dogs:id should return a dogs details', async () => {
    const resp = await request(app).get('/dogs');
    expect(resp.status).toBe(200);
    expect(resp.body[0]).toEqual({
      id: '1',
      name: 'Lottie',
      age: 4,
      breed: 'Pit Mix',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
