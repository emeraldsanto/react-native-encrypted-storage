export declare type StorageErrorCallback = (error?: Error) => void;
export declare type StorageValueCallback = (error?: Error, value?: string) => void;
export default class EncryptedStorage {
    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {string} value - The data to store.
     */
    static setItem(key: string, value: string): Promise<void>;
    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {string} value - The data to store.
     * @param {Function} cb - The function to call when the operation completes.
     */
    static setItem(key: string, value: string, cb: StorageErrorCallback): void;
    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     */
    static getItem(key: string): Promise<string | null>;
    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     * @param {Function} cb - The function to call when the operation completes.
     */
    static getItem(key: string, cb: StorageValueCallback): void;
    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     */
    static removeItem(key: string): Promise<void>;
    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     * @param {Function} cb - The function to call when the operation completes.
     */
    static removeItem(key: string, cb: StorageErrorCallback): void;
    /**
     * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
     */
    static clear(): Promise<void>;
    /**
     * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {Function} cb - The function to call when the operation completes.
     */
    static clear(cb: (error?: Error) => void): void;
}
