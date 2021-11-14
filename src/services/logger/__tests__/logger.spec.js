const { format } = require('winston');

let formatSpy;

describe('logger test suits', () => {
  beforeAll(() => {
    formatSpy = jest.spyOn(format, 'json');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('generate logger', () => {
    const logger = require('..');

    expect(formatSpy).toBeCalled();

    expect(logger.defaultMeta).toEqual({ service: 'ms' });
    expect(logger.transports.length).toEqual(1);
  });
});
