const amqplib = require('amqplib-mocks');
const { run, consumer } = require('../example');
const {
  EXCHANGE_EXAMPLE,
  QUEUE_EXAMPLE_ROUTING_KEY,
} = require('../../constants');
const createChannel = require('../../createChannel');

jest.mock('../../createChannel', () => {
  const mCh = {
    assertExchange: jest.fn().mockResolvedValue({exchange: 'ex'}),
    assertQueue: jest.fn().mockResolvedValue({queue: 'q'}),
    bindQueue: jest.fn(),
    ack: jest.fn(),
    reject: jest.fn(),
    consume: jest.fn(),
  };

  return jest.fn().mockResolvedValue(mCh);
});

jest.setMock('amqplib', amqplib);

describe('test example consumer.', () => {
  let ch = null;
  let conn = null;

  beforeEach(async () => {
    if (!conn) {
      conn = await amqplib.connect('some-random-uri');
    }
    ch = await conn.createChannel();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('check runner', async () => {
    ch = await createChannel('url');
    const spy = jest.spyOn(ch, 'consume');
    await run();

    expect(spy).toBeCalledTimes(1);
  });

  test('check consumer reject', async () => {
    ch = await createChannel('url');
    const msg = {
      fields: {
        consumerTag: 'amq.ctag-HGQslF8bKgQgIavPYImRWQ',
        deliveryTag: 1,
        redelivered: false,
        exchange: EXCHANGE_EXAMPLE,
        routingKey: QUEUE_EXAMPLE_ROUTING_KEY,
      },
      content: Buffer.from('{"test": "test"}'),
    };
    await consumer(ch)(msg);
    await expect(ch.reject.mock.calls).toEqual([[msg, false]]);
  });

  test('check consumer ack after max try', async () => {
    ch = await createChannel('url');
    const msg = {
      fields: {
        consumerTag: 'amq.ctag-HGQslF8bKgQgIavPYImRWQ',
        deliveryTag: 6,
        redelivered: false,
        exchange: EXCHANGE_EXAMPLE,
        routingKey: QUEUE_EXAMPLE_ROUTING_KEY,
      },
      content: Buffer.from('{"test": "test"}'),
    };
    await consumer(ch)(msg);
    await expect(ch.ack.mock.calls).toEqual([[msg]]);
  });

  test('check consumer ack if msg is null', async () => {
    ch = await createChannel('url');
    const msg = null;
    await consumer(ch)(msg);
    await expect(ch.ack.mock.calls).toEqual([[null]]);
  });
});