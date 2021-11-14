const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'ms' },
  transports: [
    new transports.Console({
      format: format.json(),
    }),
  ],
});

module.exports = logger;
