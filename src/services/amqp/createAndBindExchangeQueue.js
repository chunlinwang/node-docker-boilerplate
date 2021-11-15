const createQueue = require('./createQueue');
const createExchange = require('./createExchange');
const bindQueue = require('./bindQueue');

const { DL_MESSAGE_TTL } = require('./constants');

const createAndBindExchangeConsumer = async (
  ch,
  exchangeName,
  queueName,
  exType,
  routingKey = '',
  deadLetterExchangeName = null,
  deadLetterQueueName = null
) => {
  const ex = await createExchange(ch, exchangeName, exType, {
    durable: true,
  });

  const optionExchange = {
    durable: true,
  };

  const optionDeadLetterExchange = deadLetterExchangeName
    ? {
        deadLetterExchange: deadLetterExchangeName,
        deadLetterRoutingKey: routingKey,
      }
    : {};

  const q = await createQueue(ch, queueName, {
    ...optionExchange,
    ...optionDeadLetterExchange,
  });

  await bindQueue(ch, q.queue, ex.exchange, routingKey, {});

  if (deadLetterExchangeName && deadLetterQueueName) {
    const exDl = await createExchange(ch, deadLetterExchangeName, exType, {
      durable: true,
    });

    const qDl = await createQueue(ch, deadLetterQueueName, {
      durable: true,
      deadLetterExchange: deadLetterExchangeName,
      deadLetterRoutingKey: routingKey,
      messageTtl: DL_MESSAGE_TTL,
    });

    await bindQueue(ch, qDl.queue, exDl.exchange, routingKey, {});
  }

  return { ...ex, ...q };
};

module.exports = createAndBindExchangeConsumer;
