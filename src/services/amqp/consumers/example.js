#!/usr/bin/env node

const logger = require('../../logger');
const createChannel = require('../createChannel');
const createQueue = require('../createQueue');
const createExchange = require('../createExchange');
const bindQueue = require('../bindQueue');
const { rabbitmqUrl } = require('../../../../config/env');

const {
  EXCHANGE_EXAMPLE,
  EXCHANGE_DL_EXAMPLE,
  QUEUE_EXAMPLE,
  QUEUE_DL_EXAMPLE,
  RABBITMQ_TYPE_DIRECT,
  DL_MESSAGE_TTL,
  QUEUE_EXAMPLE_ROUTING_KEY,
  CONSUMER_MAX_RETRY,
} = require('../constants');

const createAndBindExchangeConsumer = async (ch) => {
  const ex = await createExchange(ch, EXCHANGE_EXAMPLE, RABBITMQ_TYPE_DIRECT, {
    durable: true,
  });

  const q = await createQueue(ch, QUEUE_EXAMPLE, {
    durable: true,
    deadLetterExchange: EXCHANGE_DL_EXAMPLE,
    deadLetterRoutingKey: QUEUE_EXAMPLE_ROUTING_KEY,
  });

  await bindQueue(ch, q.queue, ex.exchange, QUEUE_EXAMPLE_ROUTING_KEY, {});

  const exDl = await createExchange(
    ch,
    EXCHANGE_DL_EXAMPLE,
    RABBITMQ_TYPE_DIRECT,
    {
      durable: true,
    }
  );

  const qDl = await createQueue(ch, QUEUE_DL_EXAMPLE, {
    durable: true,
    deadLetterExchange: EXCHANGE_DL_EXAMPLE,
    deadLetterRoutingKey: QUEUE_EXAMPLE_ROUTING_KEY,
    messageTtl: DL_MESSAGE_TTL,
  });

  await bindQueue(ch, qDl.queue, exDl.exchange, QUEUE_EXAMPLE_ROUTING_KEY, {});

  return { ...ex, ...q };
};

const consumer = (ch) => async (msg) => {
  if (msg !== null) {
    if (msg.fields.deliveryTag > CONSUMER_MAX_RETRY) {
      return ch.ack(msg);
    }

    // We should add all logic of consumer in this function.

    // if this msg is accepted
    // return ch.ack(msg);

    // if this msg is rejected, it will be send to dead_letter_exchange
    return ch.reject(msg, false);
  }

  return ch.ack(msg);
};

const run = async () => {
  const ch = await createChannel(rabbitmqUrl);

  const { queue = null, exchange = null } = await createAndBindExchangeConsumer(
    ch
  );

  if (exchange && queue) {
    ch.consume(queue, consumer(ch));
  }
};

run().catch(logger);

module.exports = {
  createAndBindExchangeConsumer,
  run,
  consumer,
};
