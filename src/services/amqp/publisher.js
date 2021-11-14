module.exports = async (ch, exchange, routingKey, content, options = {}) => {
  await ch.publish(exchange, routingKey, Buffer.from(content), options);
};
