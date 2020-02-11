
declare module "react-native-encrypted-storage" {

    export interface EncryptedStorageStatic {

        /**
         * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
         * @param {string} key - A string that will be associated to the value for later retrieval.
         * @param {Object} value - The data to store.
         */
        store(key : string, value : Object) : Promise<boolean>;

        /**
         * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
         * @param {string} key - A string that is associated to a value.
         */
        retrieve<T>(key : string) : Promise<T | undefined>;

        /**
         * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
         * @param {string} key - A string that is associated to a value.
         */
        remove(key : string) : Promise<boolean>;
    }

    const EncryptedStorage : EncryptedStorageStatic;

    export default EncryptedStorage;
}