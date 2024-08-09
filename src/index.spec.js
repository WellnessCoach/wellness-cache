const assert = require('assert');

const CacheService = require('./cache');

async function main() {
  await CacheService.connect({
    clientConfig: {
      globalPrefix: 'LOCAL',
    },
    connectOptions: {
      redisUrl: process.env.CACHE_REDIS_URL,
    },
    errorHandler(error) {
      console.log(error);
    },
  });

  await CacheService.Cache.deleteByKey('test-key');

  const value = await CacheService.Cache.get('test-key');

  assert.equal(value, null);

  await CacheService.Cache.set('test-key', { test: 1 });

  const value2 = await CacheService.Cache.get('test-key');

  assert.deepEqual(value2, { test: 1 });
}

main().finally(() => {
  CacheService.disconnect();
});
