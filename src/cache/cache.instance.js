const { createClient } = require('redis');
const { generateErrorHandler } = require('./cache.utils');

/**
 * @typedef {{
 *   globalPrefix: string;
 * }} ClientConfig
 * @type {{
 *   client: import('redis').RedisClientType<
 *     import('redis').RedisModules,
 *     import('redis').RedisFunctions,
 *     import('redis').RedisScripts
 *   >;
 *   config: ClientConfig;
 *   errorHandler: (error: any) => void;
 * }}
 */
// @ts-ignore
// NOTE: Do not allow server to recreate the client
const cacheInstance = global._REDIS_CACHE_PRIVATE || {};
global._REDIS_CACHE_PRIVATE ??= cacheInstance;

/**
 * @param {{
 *   connectOptions: {
 *     redisUrl: string;
 *   };
 *   clientConfig: ClientConfig;
 *   errorHandler: (error: any) => void;
 * }} payload
 */
async function connect({ connectOptions, clientConfig, errorHandler }) {
  const { redisUrl } = connectOptions;

  if (global.isCacheLoaded) {
    console.warn(new Error('[cache] Do not connect cache multiple times'));
    return;
  }

  global.isCacheLoaded ??= true;

  const redisErrorHandler = generateErrorHandler(errorHandler);

  const connectedClient = await createClient({
    url: redisUrl,
  })
    .on('error', redisErrorHandler)
    .connect();

  cacheInstance.client = connectedClient;
  cacheInstance.config = clientConfig;
  cacheInstance.errorHandler = redisErrorHandler;

  console.debug('[cache] Redis connected successfully');
}

async function disconnect() {
  if (!cacheInstance) {
    throw new Error('[cache] Client does not exist');
  }

  await cacheInstance.client.disconnect();
}

module.exports = { connect, disconnect, cacheInstance };
