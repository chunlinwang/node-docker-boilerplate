const { buildCatApiRequestConfig } = require('../index');
const { catApiKey } = require('../../../../config/env');
const {
  CAT_API_IMAGE_SEARCH_URL,
  DEFAULT_PAGINATION_LIMIT,
} = require('../../../constants');

describe('buildCatApiRequestConfig test suits', () => {
  test('generate buildCatApiRequestConfig with default page', () => {
    expect(buildCatApiRequestConfig()).toEqual({
      url: CAT_API_IMAGE_SEARCH_URL,
      params: {
        page: 1,
        limit: DEFAULT_PAGINATION_LIMIT,
      },
      headers: {
        'x-api-key': catApiKey,
      },
    });
  });

  test('generate buildCatApiRequestConfig without default page', () => {
    expect(buildCatApiRequestConfig(4, 80)).toEqual({
      url: CAT_API_IMAGE_SEARCH_URL,
      params: {
        page: 4,
        limit: 80,
      },
      headers: {
        'x-api-key': catApiKey,
      },
    });
  });
});
