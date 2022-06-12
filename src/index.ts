import { NativeModules, Platform } from 'react-native';

type StorageErrorCallback = (error?: Error) => void;
type StorageValueCallback<T> = (error?: Error, value?: T) => void;

const LINKING_ERROR =
  `The package 'react-native-encrypted-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const fallback = new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  },
});

const EncryptedStorage = NativeModules.EncryptedStorage
  ? NativeModules.EncryptedStorage
  : fallback;

export function getAllKeys(): Promise<Array<string>>;
export function getAllKeys(cb: StorageValueCallback<Array<string>>): void;
export function getAllKeys(cb?: StorageValueCallback<Array<string>>) {
  if (cb) {
    void EncryptedStorage.getAllKeys()
      .then((output: Array<string>) => cb(undefined, output))
      .catch(cb);
  } else {
    return EncryptedStorage.getAllKeys();
  }
}

export function setItem(key: string, value: string): Promise<void>;
export function setItem(key: string, value: string, cb: StorageErrorCallback): void;
export function setItem(key: string, value: string, cb?: StorageErrorCallback) {
  const promise = EncryptedStorage.multiSet([[key, value]]);

  if (cb) {
    void promise.then(cb).catch(cb);
  } else {
    return promise;
  }
}

export function multiGet(keys: Array<string>): Promise<Array<string>>;
export function multiGet(keys: Array<string>, cb: StorageValueCallback<Array<string>>): void;
export function multiGet(keys: Array<string>, cb?: StorageValueCallback<Array<string>>) {
  const promise = EncryptedStorage.multiGet(keys);

  if (cb) {
    void promise
      .then((output: Array<string>) => cb(undefined, output))
      .catch(cb);
  } else {
    return promise;
  }
}

export function multiSet(items: Array<[string, string]>): Promise<void>;
export function multiSet(items: Array<[string, string]>, cb: StorageErrorCallback): void;
export function multiSet(items: Array<[string, string]>, cb?: StorageErrorCallback) {
  const promise = EncryptedStorage.multiSet(items);

  if (cb) {
    void promise.then(cb).catch(cb);
  } else {
    return promise;
  }
}
