const { buildResponse } = require('..');
const { DEFAULT_PAGINATION_LIMIT } = require('../../../constants');

describe('Cat api responseBuilder test suits', () => {
  test('should have 2 cats', () => {
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
    ];

    expect(buildResponse(data)).toEqual({
      cats: [
        'https://cdn2.thecatapi.com/images/4ee.gif',
        'https://cdn2.thecatapi.com/images/73k.jpg',
      ],
      perPage: DEFAULT_PAGINATION_LIMIT,
      currentPage: 1,
    });
  });

  test('should have no cat found', () => {
    const data = [];

    expect(buildResponse(data)).toEqual({
      cats: [],
      perPage: DEFAULT_PAGINATION_LIMIT,
      currentPage: 1,
    });
  });
});
