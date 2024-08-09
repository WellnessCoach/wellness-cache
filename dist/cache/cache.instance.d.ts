export type ClientConfig = {
    globalPrefix: string;
};
/**
 * @param {{
 *   connectOptions: {
 *     redisUrl: string;
 *   };
 *   clientConfig: ClientConfig;
 *   errorHandler: (error: any) => void;
 * }} payload
 */
export function connect({ connectOptions, clientConfig, errorHandler }: {
    connectOptions: {
        redisUrl: string;
    };
    clientConfig: ClientConfig;
    errorHandler: (error: any) => void;
}): Promise<void>;
export function disconnect(): Promise<void>;
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
export const cacheInstance: {
    client: import("redis").RedisClientType<import("redis").RedisModules, import("redis").RedisFunctions, import("redis").RedisScripts>;
    config: ClientConfig;
    errorHandler: (error: any) => void;
};
//# sourceMappingURL=cache.instance.d.ts.map