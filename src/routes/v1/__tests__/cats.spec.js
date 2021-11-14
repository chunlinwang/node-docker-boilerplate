const request = require('supertest');
const app = require('../../../app');
const httpClient = require('../../../services/httpClient');

jest.mock('../../../services/httpClient');

const data = [
  {
    breeds: [],
    height: 167,
    id: '4ee',
    url: 'https://cdn2.thecatapi.com/images/4ee.gif',
    width: 350,
  },
  {
    breeds: [],
    height: 402,
    id: '73k',
    url: 'https://cdn2.thecatapi.com/images/73k.jpg',
    width: 604,
  },
  {
    breeds: [],
    height: 732,
    id: 'a71',
    url: 'https://cdn2.thecatapi.com/images/a71.jpg',
    width: 560,
  },
  {
    breeds: [],
    height: 500,
    id: 'aov',
    url: 'https://cdn2.thecatapi.com/images/aov.jpg',
    width: 460,
  },
  {
    breeds: [],
    height: 375,
    id: 'b0s',
    url: 'https://cdn2.thecatapi.com/images/b0s.jpg',
    width: 500,
  },
  {
    breeds: [],
    height: 427,
    id: 'MTUyMzY4Mw',
    url: 'https://cdn2.thecatapi.com/images/MTUyMzY4Mw.jpg',
    width: 640,
  },
];

describe('GET /v1/cats', () => {
  test('check 200', (done) => {
    httpClient.catApiHttpClient.mockResolvedValueOnce(data);
    request(app).get('/v1/cats').expect(200, done);
  });

  test('check 500', (done) => {
    httpClient.catApiHttpClient.mockRejectedValue(new Error('Async error'));
    request(app).get('/v1/cats').expect(500, done);
  });
});
