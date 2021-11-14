const axios = require('axios');
const createError = require('http-errors');
const logger = require('../logger');
const { catApiBaseUrl, catApiVersion } = require('../../../config/env');

// eslint-disable-next-line consistent-return
const catApiHttpClient = async (config = {}) => {
  try {
    const response = await axios.request({
      baseURL: `${catApiBaseUrl}/${catApiVersion}`,
      ...config,
    });

    return response.data;
  } catch (e) {
    logger.error(e);

    throw createError(
      e.response?.status || 500,
      e.response?.data?.message || 'internal error'
    );
  }
};

module.exports = {
  catApiHttpClient,
};
