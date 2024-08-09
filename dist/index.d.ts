declare const _exports: {
    Cache: {
        generateKey(prefix: string, key?: string | Record<string, any>): string;
        get(key: string): Promise<any>;
        set(key: string, value: Record<string, any> | any[], expiresInSeconds?: number): Promise<void>;
        deleteByKey(key: string): Promise<void>;
        deleteByPrefix(prefix: "GET_HOME_COACH_AVAILABILITY_V1_REPO" | "GET_USER_TYPE_SUBSCRIPTION"): Promise<void>;
    };
    CACHE_PREFIXES: Readonly<{
        GET_COACH_AVAILABILITY_REPO: "GET_HOME_COACH_AVAILABILITY_V1_REPO";
        GET_USER_TYPE_SUBSCRIPTION: "GET_USER_TYPE_SUBSCRIPTION";
    }>;
    REDIS_ERROR_TIMEOUT: number;
    connect: typeof import("./cache/cache.instance").connect;
    disconnect: typeof import("./cache/cache.instance").disconnect;
};
export = _exports;
//# sourceMappingURL=index.d.ts.map