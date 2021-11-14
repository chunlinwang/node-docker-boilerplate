const amqplib = require('amqplib-mocks');
const { createAndBindExchangeConsumer, run, consumer } = require('../example');
const {
  EXCHANGE_EXAMPLE,
  EXCHANGE_DL_EXAMPLE,
  QUEUE_EXAMPLE,
  QUEUE_DL_EXAMPLE,
  RABBITMQ_TYPE_DIRECT,
  DL_MESSAGE_TTL,
  QUEUE_EXAMPLE_ROUTING_KEY,
} = require('../../constants');
const createChannel = require('../../createChannel');

jest.mock('../../createChannel', () => {
  const mCh = {
    assertExchange: jest.fn().mockResolvedValue({}),
    assertQueue: jest.fn().mockResolvedValue({}),
    bindQueue: jest.fn(),
    ack: jest.fn(),
    reject: jest.fn(),
    consume: jest.fn(),
  };

  return jest.fn().mockResolvedValue(mCh);
});

jest.setMock('amqplib', amqplib);



describe('test queue and exchange dose not exist.', () => {
  let ch;
  let conn;

  beforeEach(async () => {
    if (!conn) {
      conn = await amqplib.connect('some-random-uri');
    }
    ch = await conn.createChannel();
  });

  test('check consumer ack if msg is valid', async () => {
    ch = await createChannel('url');
    const spy = jest.spyOn(ch, 'consume');

    await run();

    expect(spy).toBeCalledTimes(0);
  });
})