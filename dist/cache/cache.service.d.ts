declare namespace CacheService {
    /**
     * @param {string} prefix
     * @param {string | Record<string, any>} [key]
     */
    function generateKey(prefix: string, key?: string | Record<string, any>): string;
    /** @param {string} key */
    function get(key: string): Promise<any>;
    /**
     * Get data for multiple keys
     * @param {string[]} keys - Array of keys to fetch
     * @returns {Promise<Record<string, any>>} - Object with key-value pairs
     */
    function getMultiple(keys: string[]): Promise<Record<string, any>>;
    /**
     * @param {string} key
     * @param {Record<string, any> | any[]} value
     * @param {number} [expiresInSeconds]
     */
    function set(key: string, value: Record<string, any> | any[], expiresInSeconds?: number): Promise<void>;
    /**
     * Set data for multiple key-value pairs
     * @param {Record<string, Record<string, any> | any[]>} keyValuePairs - Object with key-value pairs to set
     * @param {number} [expiresInSeconds] - Optional expiration time in seconds
     * @returns {Promise<void>}
     */
    function setMultiple(keyValuePairs: Record<string, Record<string, any> | any[]>, expiresInSeconds?: number): Promise<void>;
    /** @param {string} key */
    function deleteByKey(key: string): Promise<void>;
    /** @param {CACHE_PREFIXES[keyof CACHE_PREFIXES]} prefix */
    function deleteByPrefix(prefix: "GET_HOME_COACH_AVAILABILITY_V1_REPO" | "GET_USER_TYPE_SUBSCRIPTION" | "USER_PROPERTIES" | "USER_PROPERTY_SCHEMAS"): Promise<void>;
}
export { CacheService as Cache };
//# sourceMappingURL=cache.service.d.ts.map