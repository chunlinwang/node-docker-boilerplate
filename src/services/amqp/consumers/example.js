#!/usr/bin/env node

const logger = require('../../logger');
const createChannel = require('../createChannel');
const createAndBindExchangeConsumer = require('../createAndBindExchangeQueue');
const { rabbitmqUrl } = require('../../../../config/env');

const {
  EXCHANGE_EXAMPLE,
  EXCHANGE_DL_EXAMPLE,
  QUEUE_EXAMPLE,
  QUEUE_DL_EXAMPLE,
  RABBITMQ_TYPE_DIRECT,
  QUEUE_EXAMPLE_ROUTING_KEY,
  CONSUMER_MAX_RETRY,
} = require('../constants');

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
    ch,
    EXCHANGE_EXAMPLE,
    QUEUE_EXAMPLE,
    RABBITMQ_TYPE_DIRECT,
    QUEUE_EXAMPLE_ROUTING_KEY,
    EXCHANGE_DL_EXAMPLE,
    QUEUE_DL_EXAMPLE
  );

  if (exchange && queue) {
    ch.consume(queue, consumer(ch));
  }
};

run().catch(logger);

module.exports = {
  run,
  consumer,
};
