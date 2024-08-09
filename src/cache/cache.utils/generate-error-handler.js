const { REDIS_ERROR_TIMEOUT } = require('../cache.constants');

/**
 * @type {{
 *   [key: string]: {
 *     expiresAt: number;
 *   };
 * }}
 */
const connectionErrors = {};

/**
 * @param {(error: any) => void} errorHandler
 * @returns
 */
function generateErrorHandler(errorHandler) {
  /** @param {any} error */
  return (error) => {
    const { message } = error;

    const isErrorOnPause = connectionErrors[message]?.expiresAt > Date.now();

    if (isErrorOnPause) {
      return;
    }

    connectionErrors[message] = {
      expiresAt: Date.now() + REDIS_ERROR_TIMEOUT,
    };

    errorHandler(error);
  };
}

module.exports = { generateErrorHandler };
