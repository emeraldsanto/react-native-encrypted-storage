/* eslint-disable no-dupe-class-members */

import { NativeModules } from 'react-native';
import { keychainAccessibility } from './constants';

const { RNEncryptedStorage } = NativeModules;

if (!RNEncryptedStorage) {
  throw new Error('RNEncryptedStorage is undefined');
}

type KeychainAccessibilityKeys = keyof typeof keychainAccessibility;
export type EncryptedStorageOptions = {
  /**
   * iOS only
   */
  keychainAccessibility?: typeof keychainAccessibility[KeychainAccessibilityKeys];
};

export type StorageErrorCallback = (error?: Error) => void;
export type StorageValueCallback = (error?: Error, value?: string) => void;

export default class EncryptedStorage {
  /**
   * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {string} key - A string that will be associated to the value for later retrieval.
   * @param {string} value - The data to store.
   */
  static setItem(
    key: string,
    value: string,
    options?: EncryptedStorageOptions
  ): Promise<void>;

  /**
   * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {string} key - A string that will be associated to the value for later retrieval.
   * @param {string} value - The data to store.
   * @param {Function} cb - The function to call when the operation completes.
   */
  static setItem(
    key: string,
    value: string,
    options?: EncryptedStorageOptions,
    cb?: StorageErrorCallback
  ): void;
  static setItem(
    key: string,
    value: string,
    options?: EncryptedStorageOptions,
    cb?: StorageErrorCallback
  ): void | Promise<void> {
    if (cb) {
      RNEncryptedStorage.setItem(key, value, options).then(cb).catch(cb);
      return;
    }

    return RNEncryptedStorage.setItem(key, value, options);
  }

  /**
   * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
   * @param {string} key - A string that is associated to a value.
   */
  static getItem(
    key: string,
    options?: EncryptedStorageOptions
  ): Promise<string | null>;

  /**
   * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
   * @param {string} key - A string that is associated to a value.
   * @param {Function} cb - The function to call when the operation completes.
   */
  static getItem(
    key: string,
    options?: EncryptedStorageOptions,
    cb?: StorageValueCallback
  ): void;
  static getItem(
    key: string,
    options?: EncryptedStorageOptions,
    cb?: StorageValueCallback
  ): void | Promise<string | null> {
    if (cb) {
      RNEncryptedStorage.getItem(key, options).then(cb).catch(cb);
      return;
    }

    return RNEncryptedStorage.getItem(key, options);
  }

  /**
   * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {string} key - A string that is associated to a value.
   */
  static removeItem(
    key: string,
    options?: EncryptedStorageOptions
  ): Promise<void>;

  /**
   * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {string} key - A string that is associated to a value.
   * @param {Function} cb - The function to call when the operation completes.
   */
  static removeItem(
    key: string,
    options?: EncryptedStorageOptions,
    cb?: StorageErrorCallback
  ): void;
  static removeItem(
    key: string,
    options?: EncryptedStorageOptions,
    cb?: StorageErrorCallback
  ): void | Promise<void> {
    if (cb) {
      RNEncryptedStorage.removeItem(key, options).then(cb).catch(cb);
      return;
    }

    return RNEncryptedStorage.removeItem(key, options);
  }

  /**
   * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
   */
  static clear(): Promise<void>;

  /**
   * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {Function} cb - The function to call when the operation completes.
   */
  static clear(cb: StorageErrorCallback): void;
  static clear(cb?: StorageErrorCallback): void | Promise<void> {
    if (cb) {
      RNEncryptedStorage.clear().then(cb).catch(cb);
      return;
    }

    return RNEncryptedStorage.clear();
  }
}
