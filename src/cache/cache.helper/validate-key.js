// @ts-check

/** @param {any} key */
function validateKey(key) {
  if (typeof key !== 'string') {
    throw new Error(`[cache] key ${key} is not a string`);
  }
}

module.exports = {
  validateKey,
};
