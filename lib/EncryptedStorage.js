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
    store: async function (key, value) {
        try {
            await RNEncryptedStorage.store(key, JSON.stringify(value));
            return true;
        } catch (error) {
            return false;
        }
    },

    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     */
    retrieve: async function (key) {
        try {
            const savedValue = await RNEncryptedStorage.retrieve(key);
            return JSON.parse(savedValue);
        } catch (error) {
            return undefined;
        }
    },

    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     */
    remove: async function (key) {
        try {
            await RNEncryptedStorage.remove(key);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = EncryptedStorage;
