const amqplib = require('amqplib-mocks');

const createAndBindExchangeQueue = require('../createAndBindExchangeQueue');
const {
    EXCHANGE_EXAMPLE,
    EXCHANGE_DL_EXAMPLE,
    QUEUE_EXAMPLE,
    QUEUE_DL_EXAMPLE,
    RABBITMQ_TYPE_DIRECT,
    QUEUE_EXAMPLE_ROUTING_KEY,
    DL_MESSAGE_TTL,
  } = require('../constants');

jest.setMock('amqplib', amqplib);

describe('test createAndBindExchangeQueue.', () => {

    let ch = null;
    let conn = null;
  
    beforeEach(async () => {
      if (!conn) {
        conn = await amqplib.connect('some-random-uri');
      }
      ch = await conn.createChannel();
    });

    test('init Ex and Q for example consumer.', async () => {
        const spyAssertExchange = jest.spyOn(ch, 'assertExchange');
        const spyAssertQueue = jest.spyOn(ch, 'assertQueue');
        const spyBindQueue = jest.spyOn(ch, 'bindQueue');
    
        const result = await createAndBindExchangeQueue(ch, EXCHANGE_EXAMPLE, QUEUE_EXAMPLE, RABBITMQ_TYPE_DIRECT, QUEUE_EXAMPLE_ROUTING_KEY, EXCHANGE_DL_EXAMPLE, QUEUE_DL_EXAMPLE);
    
        expect(spyAssertExchange).toBeCalledTimes(2);
        expect(spyAssertExchange.mock.calls).toEqual([
          [
            EXCHANGE_EXAMPLE,
            RABBITMQ_TYPE_DIRECT,
            {
              durable: true,
            },
          ],
          [
            EXCHANGE_DL_EXAMPLE,
            RABBITMQ_TYPE_DIRECT,
            {
              durable: true,
            },
          ],
        ]);
        expect(spyAssertQueue).toBeCalledTimes(2);
        expect(spyAssertQueue.mock.calls).toEqual([
          [
            QUEUE_EXAMPLE,
            {
              durable: true,
              deadLetterExchange: EXCHANGE_DL_EXAMPLE,
              deadLetterRoutingKey: QUEUE_EXAMPLE_ROUTING_KEY,
            },
          ],
          [
            QUEUE_DL_EXAMPLE,
            {
              durable: true,
              deadLetterExchange: EXCHANGE_DL_EXAMPLE,
              deadLetterRoutingKey: QUEUE_EXAMPLE_ROUTING_KEY,
              messageTtl: DL_MESSAGE_TTL,
            },
          ],
        ]);
        expect(spyBindQueue).toBeCalledTimes(2);
        expect(spyBindQueue.mock.calls).toEqual([
          [QUEUE_EXAMPLE, EXCHANGE_EXAMPLE, QUEUE_EXAMPLE_ROUTING_KEY, {}],
          [QUEUE_DL_EXAMPLE, EXCHANGE_DL_EXAMPLE, QUEUE_EXAMPLE_ROUTING_KEY, {}],
        ]);
    
        expect(result).toEqual({
          consumerCount: 0,
          exchange: EXCHANGE_EXAMPLE,
          messageCount: 0,
          queue: QUEUE_EXAMPLE,
        });
      });    

      test('init Ex and Q for example consumer. with out dead letter', async () => {
        const spyAssertExchange = jest.spyOn(ch, 'assertExchange');
        const spyAssertQueue = jest.spyOn(ch, 'assertQueue');
        const spyBindQueue = jest.spyOn(ch, 'bindQueue');
    
        const result = await createAndBindExchangeQueue(ch, EXCHANGE_EXAMPLE, QUEUE_EXAMPLE, RABBITMQ_TYPE_DIRECT);
    
        expect(spyAssertExchange).toBeCalledTimes(1);
        expect(spyAssertExchange.mock.calls).toEqual([
          [
            EXCHANGE_EXAMPLE,
            RABBITMQ_TYPE_DIRECT,
            {
              durable: true,
            },
          ],
        ]);
        expect(spyAssertQueue).toBeCalledTimes(1);
        expect(spyAssertQueue.mock.calls).toEqual([
          [
            QUEUE_EXAMPLE,
            {
              durable: true,
            },
          ],
        ]);

        expect(spyBindQueue).toBeCalledTimes(1);
        expect(spyBindQueue.mock.calls).toEqual([
          [QUEUE_EXAMPLE, EXCHANGE_EXAMPLE, '', {}],
        ]);
    
        expect(result).toEqual({
          consumerCount: 0,
          exchange: EXCHANGE_EXAMPLE,
          messageCount: 0,
          queue: QUEUE_EXAMPLE,
        });
      });    
});