import { NativeModules, Platform } from 'react-native';

type StorageErrorCallback = (error?: Error) => void;
type StorageValueCallback<T> = (error?: Error, value?: T) => void;

const LINKING_ERROR =
  `The package 'react-native-encrypted-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const fallback = new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  }
);

const EncryptedStorage = NativeModules.EncryptedStorage
  ? NativeModules.EncryptedStorage
  : fallback;

export function getAllKeys(): Promise<Array<string>>;
export function getAllKeys(cb: StorageValueCallback<Array<string>>): void;
export function getAllKeys(cb?: StorageValueCallback<Array<string>>) {
  if (cb) {
    EncryptedStorage.getAllKeys()
      .then((output: Array<string>) => cb(undefined, output))
      .catch(cb);
  } else {
    return EncryptedStorage.getAllKeys();
  }
}
