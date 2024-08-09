// @ts-check

const { TimeInMs } = require('../common/server/constants');

module.exports = Object.freeze({
  CACHE_PREFIXES: Object.freeze({
    GET_COACH_AVAILABILITY_REPO: 'GET_HOME_COACH_AVAILABILITY_V1_REPO',
  }),
  REDIS_ERROR_TIMEOUT: 1 * TimeInMs.Minute,
});
