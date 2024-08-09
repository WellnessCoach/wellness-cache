declare namespace CacheService {
    /**
     * @param {string} prefix
     * @param {string | Record<string, any>} [key]
     */
    function generateKey(prefix: string, key?: string | Record<string, any>): string;
    /** @param {string} key */
    function get(key: string): Promise<any>;
    /**
     * @param {string} key
     * @param {Record<string, any> | any[]} value
     * @param {number} [expiresInSeconds]
     */
    function set(key: string, value: Record<string, any> | any[], expiresInSeconds?: number): Promise<void>;
    /** @param {string} key */
    function deleteByKey(key: string): Promise<void>;
    /** @param {CACHE_PREFIXES[keyof CACHE_PREFIXES]} prefix */
    function deleteByPrefix(prefix: "GET_HOME_COACH_AVAILABILITY_V1_REPO"): Promise<void>;
}
export { CacheService as Cache };
//# sourceMappingURL=cache.service.d.ts.map