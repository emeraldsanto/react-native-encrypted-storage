import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-encrypted-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const EncryptedStorage = NativeModules.RNEncryptedStorage
  ? NativeModules.RNEncryptedStorage
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return EncryptedStorage.multiply(a, b);
}

export function getAllKeys(): Promise<Array<string>> {
  return EncryptedStorage.getAllKeys();
}
