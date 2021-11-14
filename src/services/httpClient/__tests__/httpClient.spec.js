const axios = require('axios');
const { catApiHttpClient } = require('..');
const logger = require('../../logger');
const { catApiBaseUrl, catApiVersion } = require('../../../../config/env');

jest.mock('../../logger');

describe('httpClient test suits', () => {
  test('run http call successfully', async () => {
    const mockData = [
      {
        breeds: [],
        height: 800,
        id: 'cm4',
        url: 'https://cdn2.thecatapi.com/images/cm4.jpg',
        width: 707,
      },
      {
        breeds: [],
        height: 1936,
        id: 'MTYzMDkyMg',
        url: 'https://cdn2.thecatapi.com/images/MTYzMDkyMg.jpg',
        width: 2592,
      },
    ];

    const spy = jest
      .spyOn(axios, 'request')
      .mockImplementationOnce(() => mockData);

    await catApiHttpClient({ params: { name: 'test' }, url: '/public/cats' });

    expect(spy).toBeCalledWith({
      baseURL: `${catApiBaseUrl}/${catApiVersion}`,
      params: { name: 'test' },
      url: '/public/cats',
    });
  });

  test('should logger an error', async () => {
    const spy = jest.spyOn(axios, 'request').mockRejectedValue('error');

    await expect(catApiHttpClient()).rejects.toThrowError();

    expect(spy).toBeCalledWith({
      baseURL: `${catApiBaseUrl}/${catApiVersion}`,
    });

    expect(logger.error).toBeCalled();
  });
});
