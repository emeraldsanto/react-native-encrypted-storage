import { NativeModules } from "react-native";
const { RNEncryptedStorage } = NativeModules;

if (!RNEncryptedStorage) {
    throw new Error("RNEncryptedStorage is undefined");
}

export default class EncryptedStorage {

    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {string} value - The data to store.
     */
    static async setItem(key: string, value: string, cb?: (error: Error | undefined) => void): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await RNEncryptedStorage.setItem(key, value);
                cb?.(undefined);
                resolve(undefined);
            } catch (error) {
                cb?.(error);
                reject(error);
            }
        });
    }

    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     */
    static async getItem(key: string, cb?: (error: Error | undefined, value: string | undefined) => void): Promise<string | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await RNEncryptedStorage.getItem(key);
                cb && cb(undefined, value ?? undefined);
                resolve(value ?? undefined);
            } catch (error) {
                cb && cb(error, undefined);
                reject(error);
            }
        });
    }

    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     */
    static async removeItem(key: string, cb?: (error: Error | undefined) => void): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await RNEncryptedStorage.removeItem(key);
                cb && cb(undefined);
                resolve(undefined);
            } catch (error) {
                cb && cb(error);
                reject(error);
            }
        });
    }
}