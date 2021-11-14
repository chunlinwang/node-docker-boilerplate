const { catApiKey } = require('../../../config/env');
const {
  CAT_API_IMAGE_SEARCH_URL,
  DEFAULT_PAGINATION_LIMIT,
} = require('../../constants');

const buildCatApiRequestConfig = (
  page = 1,
  limit = DEFAULT_PAGINATION_LIMIT
) => ({
  url: CAT_API_IMAGE_SEARCH_URL,
  params: {
    page,
    limit,
  },
  headers: {
    'x-api-key': catApiKey,
  },
});

module.exports = {
  buildCatApiRequestConfig,
};
