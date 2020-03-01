const { NativeModules } = require('react-native');
const { RNEncryptedStorage } = NativeModules;

if (!RNEncryptedStorage) {
    throw new Error("RNEncryptedStorage is undefined");
}

const EncryptedStorage = {
    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {Object} value - The data to store.
     */
    setItem: async function (key, value, cb) {
        return new Promise(async (resolve, reject) => {
            try {
                await RNEncryptedStorage.setItem(key, value);
                cb && cb(undefined);
                resolve(undefined);
            } catch (error) {
                cb && cb(error);
                reject(error);
            }
        });
    },

    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     */
    getItem: async function (key, cb) {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await RNEncryptedStorage.getItem(key);
                cb && cb(undefined, value || undefined);
                resolve(value || undefined);
            } catch (error) {
                cb && cb(error, undefined);
                reject(error);            
            }
        });
    },

    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     */
    removeItem: async function (key, cb) {
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

module.exports = EncryptedStorage;