module.exports = async (ch, q, ex, routingKey, option = {}) =>
  ch.bindQueue(q, ex, routingKey, option);
