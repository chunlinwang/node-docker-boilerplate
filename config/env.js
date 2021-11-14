require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.APPLICATION_PORT || 8080,
  catApiKey: process.env.CAT_API_KEY,
  catApiBaseUrl: process.env.CAT_API_BASE_URI,
  catApiVersion: process.env.CAT_API_VERSION,
  rabbitmqUrl: process.env.RABBITMQ_URL,
};
