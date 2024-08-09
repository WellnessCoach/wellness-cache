const { cacheInstance } = require('../cache.instance');

/**
 * @param {any} error
 * @returns
 */
function wrapperErrorHandler(error) {
  cacheInstance.errorHandler(error);

  return null;
}

/**
 * @template {Function} T
 * @param {T} fn
 * @returns {(...args: Parameters<T>) => Promise<ReturnType<T> | null>}
 */
function fnWrapper(fn) {
  if (fn[Symbol.toStringTag] === 'AsyncFunction') {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (err) {
        return wrapperErrorHandler(err);
      }
    };
  }

  return (...args) => {
    try {
      return fn(...args);
    } catch (err) {
      return wrapperErrorHandler(err);
    }
  };
}

/**
 * @template {any} O
 * @param {O} obj
 * @returns {O}
 */
function cacheWrapper(obj) {
  const newObj = Object.assign({}, obj);

  for (const key in newObj) {
    // @ts-ignore
    newObj[key] = fnWrapper(obj[key]);
  }

  // @ts-ignore
  return newObj;
}

module.exports = { cacheWrapper };
