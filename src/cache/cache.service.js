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
   * Get data for multiple keys
   * @param {string[]} keys - Array of keys to fetch
   * @returns {Promise<Record<string, any>>} - Object with key-value pairs
   */
  async getMultiple(keys) {
    keys.forEach((key) => validateKey(key));

    const values = await cacheInstance.client.mGet(keys);

    // Combine keys with their parsed values
    return keys.reduce((result, key, index) => {
      result[key] = values[index] ? JSON.parse(values[index]) : null;
      return result;
    }, {});
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

  /**
   * Set data for multiple key-value pairs
   * @param {Record<string, Record<string, any> | any[]>} keyValuePairs - Object with key-value pairs to set
   * @param {number} [expiresInSeconds] - Optional expiration time in seconds
   * @returns {Promise<void>}
   */
  async setMultiple(keyValuePairs, expiresInSeconds) {
    // Validate all keys
    Object.keys(keyValuePairs).forEach((key) => validateKey(key));

    const pipeline = cacheInstance.client.multi();
    
    Object.keys(keyValuePairs).forEach((key) => {
      const str = JSON.stringify(keyValuePairs[key]);
      pipeline.set(key, str, {
        EX: expiresInSeconds ?? DEFAULT_EXPIRES_IN_SECONDS,
      });
    });

    await pipeline.exec();
  },

  /** @param {string} key */
  async deleteByKey(key) {
    validateKey(key);

    await cacheInstance.client.del(key);
  },

  /**
   * Delete multiple keys at once
   * Use this for small key sets (less than 100 keys)
   * @param {string[]} keys - Array of keys to delete
   * @returns {Promise<number>} - Number of keys deleted
   */
  async deleteMultiple(keys) {
    keys.forEach((key) => validateKey(key));

    const deletedCount = await cacheInstance.client.del(keys);
    return deletedCount;
  },

  /**
   * Delete multiple keys using Redis multi for better performance
   * Use this for large key sets (100+ keys) for atomic operation
   * @param {string[]} keys - Array of keys to delete
   * @returns {Promise<Array>} - Results from each deletion
   */
  async deleteMultipleAtomic(keys) {
    keys.forEach((key) => validateKey(key));

    const pipeline = cacheInstance.client.multi();
    
    // Add all DEL commands to pipeline
    keys.forEach(key => {
      pipeline.del(key);
    });
    
    // Execute all commands in single atomic operation
    const results = await pipeline.exec();
    
    return results;
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
