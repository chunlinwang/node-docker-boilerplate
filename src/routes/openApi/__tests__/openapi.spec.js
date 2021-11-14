const request = require('supertest');
const app = require('../../../app');

describe('test open api', () => {
  test('openApi check', async () => {
    const res = await request(app)
      .get('/openapi.json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.openapi).toEqual('3.0.0');
  });
});
