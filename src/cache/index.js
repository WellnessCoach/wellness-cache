const { connect, disconnect } = require('./cache.instance');

module.exports = {
  connect,
  disconnect,
  ...require('./cache.constants'),
  ...require('./cache.service'),
};
