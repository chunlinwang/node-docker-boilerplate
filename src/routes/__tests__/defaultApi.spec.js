const request = require('supertest');
const app = require('../../app');

describe('GET /v1/api', () => {
  test('check homepage', (done) => {
    request(app).get('/').expect('Content-Type', /json/).expect(
      200,
      {
        success: true,
        msg: "Welcome to use Chunlin's nodeJs docker boilerplate.",
      },
      done
    );
  });

  test('check 404', (done) => {
    request(app)
      .get('/404')
      .expect('Content-Type', /json/)
      .expect(404, { success: false, msg: 'This page is not found.' }, done);
  });
});
