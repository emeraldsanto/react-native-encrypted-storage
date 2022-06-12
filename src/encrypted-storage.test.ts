import { NativeModules } from 'react-native';
import { EncryptedStorage } from './encrypted-storage';

const { EncryptedStorage: module } = NativeModules;

describe('encrypted-storage.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllKeys', () => {
    describe('when the native module throws an error', () => {
      const exception = new Error('Yo!');

      it('should throw the error', () => {
        jest.mocked(module.getAllKeys).mockRejectedValue(exception);

        return expect(EncryptedStorage.getAllKeys())
          .rejects
          .toStrictEqual(exception);
      });

      it('should provide the error and a null array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockRejectedValue(exception);

        EncryptedStorage.getAllKeys((error, keys) => {
          expect(error).toStrictEqual(exception);
          expect(keys).toBeNull();
          done();
        });
      });
    });

    describe('when the storage is empty', () => {
      it('should return an empty array', () => {
        jest.mocked(module.getAllKeys).mockResolvedValue([]);

        return expect(EncryptedStorage.getAllKeys())
          .resolves
          .toStrictEqual([]);
      });

      it('should provide no error and an empty array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockResolvedValue([]);

        EncryptedStorage.getAllKeys((error, keys) => {
          expect(error).toBeNull();
          expect(keys).toStrictEqual([]);
          done();
        });
      });
    });

    describe('when the storage is not empty', () => {
      const keys = ['one', 'two', 'three'];

      it('should return all keys in an array', () => {
        jest.mocked(module.getAllKeys).mockResolvedValue(keys);

        return expect(EncryptedStorage.getAllKeys())
          .resolves
          .toStrictEqual(keys);
      });

      it('should provide no error and all keys in an array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockResolvedValue([]);

        EncryptedStorage.getAllKeys((error, keys) => {
          expect(error).toBeNull();
          expect(keys).toStrictEqual(keys);
          done();
        });
      });
    });
  });
});
