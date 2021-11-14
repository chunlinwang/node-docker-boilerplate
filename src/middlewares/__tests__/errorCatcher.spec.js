const error = require('../errorCatcher');

describe('Test any error suits', () => {
  test('default error', function () {
    const res = {
      status: jest.fn().mockImplementationOnce((data) => {
        this.statusCode = data;
      }),
      json: jest.fn().mockImplementationOnce((data) => {
        this.json = data;
      }),
    };

    error(Error, {}, res, jest.fn());

    expect(res.status).toBeCalled();
    expect(res.json).toBeCalled();
  });
});
