const swaggerJsdoc = require('swagger-jsdoc');
const { port } = require('../../../config/env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Chunlin's NodeJs docker boilerplate",
      version: '0.0.1',
    },
    servers: [
      {
        url: `http://127.0.0.1:${port}/`,
        description: 'localhost',
      },
    ],
  },
  apis: ['./src/routes/**/*.js'],
};

const openApiSpecification = swaggerJsdoc(options);

module.exports = (req, res) => {
  setImmediate(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openApiSpecification);
  });
};
