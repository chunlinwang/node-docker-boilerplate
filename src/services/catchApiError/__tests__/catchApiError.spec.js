const catchApiError = require('..');

describe('catchApiError test suits', () => {
  test('should catch error.', async () => {
    const promise = new Promise((resolve, reject) => {
      throw 'ko';
    });

    const mock = jest.fn().mockImplementationOnce(() => promise);

    const next = jest.fn().mockImplementationOnce((error) => error);

    const result = await catchApiError(mock)('', '', next);

    expect(result).toBe('ko');
  });
});
