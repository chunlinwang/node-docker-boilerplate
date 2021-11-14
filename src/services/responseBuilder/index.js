const { DEFAULT_PAGINATION_LIMIT } = require('../../constants');

const pickData = (data) => {
  const { url } = data;

  return url;
};

const getCats = (data) => data.map(pickData);

const buildResponse = (data, currentPage = 1) => ({
  cats: getCats(data),
  perPage: DEFAULT_PAGINATION_LIMIT,
  currentPage,
});

module.exports = {
  buildResponse,
};
