declare const _exports: {
    Cache: {
        generateKey(prefix: string, key?: string | Record<string, any>): string;
        get(key: string): Promise<any>;
        getMultiple(keys: string[]): Promise<Record<string, any>>;
        set(key: string, value: Record<string, any> | any[], expiresInSeconds?: number): Promise<void>;
        deleteByKey(key: string): Promise<void>;
        deleteByPrefix(prefix: "GET_HOME_COACH_AVAILABILITY_V1_REPO" | "GET_USER_TYPE_SUBSCRIPTION" | "USER_PROPERTIES" | "USER_PROPERTY_SCHEMAS"): Promise<void>;
    };
    CACHE_PREFIXES: Readonly<{
        GET_COACH_AVAILABILITY_REPO: "GET_HOME_COACH_AVAILABILITY_V1_REPO";
        GET_USER_TYPE_SUBSCRIPTION: "GET_USER_TYPE_SUBSCRIPTION";
        USER_PROPERTIES: "USER_PROPERTIES";
        USER_PROPERTY_SCHEMAS: "USER_PROPERTY_SCHEMAS";
    }>;
    REDIS_ERROR_TIMEOUT: number;
    connect: typeof connect;
    disconnect: typeof disconnect;
};
export = _exports;
import { connect } from "./cache.instance";
import { disconnect } from "./cache.instance";
//# sourceMappingURL=index.d.ts.map