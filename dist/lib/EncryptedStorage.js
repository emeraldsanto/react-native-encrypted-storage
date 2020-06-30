"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { RNEncryptedStorage } = react_native_1.NativeModules;
if (!RNEncryptedStorage) {
    throw new Error("RNEncryptedStorage is undefined");
}
class EncryptedStorage {
    static setItem(key, value, cb) {
        if (cb) {
            RNEncryptedStorage.setItem(key, value).then(cb).catch(cb);
            return;
        }
        return RNEncryptedStorage.setItem(key, value);
    }
    static getItem(key, cb) {
        if (cb) {
            RNEncryptedStorage.getItem(key).then(cb).catch(cb);
            return;
        }
        return RNEncryptedStorage.getItem(key);
    }
    static removeItem(key, cb) {
        if (cb) {
            RNEncryptedStorage.removeItem(key).then(cb).catch(cb);
            return;
        }
        return RNEncryptedStorage.removeItem(key);
    }
    static clear(cb) {
        if (cb) {
            RNEncryptedStorage.clear().then(cb).catch(cb);
            return;
        }
        return RNEncryptedStorage.clear();
    }
}
exports.default = EncryptedStorage;
