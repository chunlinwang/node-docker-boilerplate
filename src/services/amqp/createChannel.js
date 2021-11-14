const amqplib = require('amqplib');

const createChannel = async (uri) => {
  const conn = await amqplib.connect(uri);

  return conn.createChannel();
};

module.exports = createChannel;
