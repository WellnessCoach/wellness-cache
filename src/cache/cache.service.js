// @ts-check

const { cacheInstance } = require('./cache.instance');
const { validateKey, cacheWrapper } = require('./cache.helper');
const { DEFAULT_EXPIRES_IN_SECONDS, CACHE_KEY_DELIMITER } = require('./cache.config');
const { CACHE_PREFIXES } = require('./cache.constants');

/** @param {string} prefix */
function generateFullPrefix(prefix) {
  return cacheInstance.config.globalPrefix + prefix;
}

// TODO: do not allow to use cache while client is't loaded
// Type for client is be <RedisClient> | {}
const CacheService = cacheWrapper({
  /**
   * @param {string} prefix
   * @param {string | Record<string, any>} [key]
   */
  generateKey(prefix, key) {
    let strKey = null;

    if (key == undefined) {
      strKey = '';
    } else if (typeof key === 'string') {
      strKey = key;
    } else {
      strKey = JSON.stringify(key);
    }

    // Example: [DEV]GET_COACHES?active=true
    return `${generateFullPrefix(prefix)}${CACHE_KEY_DELIMITER}${strKey}`;
  },

  /** @param {string} key */
  async get(key) {
    validateKey(key);

    return cacheInstance.client.get(key).then((value) => JSON.parse(value));
  },

  /**
   * @param {string} key
   * @param {Record<string, any> | any[]} value
   * @param {number} [expiresInSeconds]
   */
  async set(key, value, expiresInSeconds) {
    validateKey(key);

    const str = JSON.stringify(value);

    await cacheInstance.client.set(key, str, {
      EX: expiresInSeconds ?? DEFAULT_EXPIRES_IN_SECONDS,
    });
  },

  /** @param {string} key */
  async deleteByKey(key) {
    validateKey(key);

    await cacheInstance.client.del(key);
  },

  /** @param {CACHE_PREFIXES[keyof CACHE_PREFIXES]} prefix */
  async deleteByPrefix(prefix) {
    validateKey(prefix);

    for await (const key of cacheInstance.client.scanIterator({
      TYPE: 'string',
      MATCH: `${generateFullPrefix(prefix)}*`,
      COUNT: 100,
    })) {
      await cacheInstance.client.del(key);
    }
  },
});

module.exports = { Cache: CacheService };
