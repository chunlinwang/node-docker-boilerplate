module.exports = async (ch, ex, type, option = {}) =>
  ch.assertExchange(ex, type, option);
