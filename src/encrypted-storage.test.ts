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
        jest.mocked(module.getAllKeys).mockRejectedValueOnce(exception);

        return expect(EncryptedStorage.getAllKeys())
          .rejects
          .toStrictEqual(exception);
      });

      it('should provide the error and a null array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockRejectedValueOnce(exception);

        EncryptedStorage.getAllKeys((error, keys) => {
          expect(error).toStrictEqual(exception);
          expect(keys).toBeNull();
          done();
        });
      });
    });

    describe('when the storage is empty', () => {
      it('should return an empty array', () => {
        jest.mocked(module.getAllKeys).mockResolvedValueOnce([]);

        return expect(EncryptedStorage.getAllKeys())
          .resolves
          .toStrictEqual([]);
      });

      it('should provide no error and an empty array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockResolvedValueOnce([]);

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
        jest.mocked(module.getAllKeys).mockResolvedValueOnce(keys);

        return expect(EncryptedStorage.getAllKeys())
          .resolves
          .toStrictEqual(keys);
      });

      it('should provide no error and all keys in an array to the callback', (done) => {
        jest.mocked(module.getAllKeys).mockResolvedValueOnce([]);

        EncryptedStorage.getAllKeys((error, keys) => {
          expect(error).toBeNull();
          expect(keys).toStrictEqual(keys);
          done();
        });
      });
    });
  });

  describe('getItem', () => {
    describe('when the native module throws an error', () => {
      const exception = new Error('Yo!');

      it('should throw the error', () => {
        jest.mocked(module.multiGet).mockRejectedValueOnce(exception);

        return expect(EncryptedStorage.getItem('some-key'))
          .rejects
          .toStrictEqual(exception);
      });

      it('should provide the error and a null value to the callback', (done) => {
        jest.mocked(module.multiGet).mockRejectedValueOnce(exception);

        EncryptedStorage.getItem('some-key', (error, value) => {
          expect(error).toStrictEqual(exception);
          expect(value).toBeNull();
          done();
        });
      });
    });

    describe('when the key does not exist', () => {
      it('should return null', () => {
        jest.mocked(module.multiGet).mockResolvedValueOnce([]);

        return expect(EncryptedStorage.getItem('some-key'))
          .resolves
          .toBeNull();
      });

      it('should provide no error and a null value to the callback', (done) => {
        jest.mocked(module.multiGet).mockResolvedValueOnce([]);

        EncryptedStorage.getItem('some-key', (error, value) => {
          expect(error).toBeNull();
          expect(value).toBeNull();
          done();
        });
      });
    });

    describe('when the key exists', () => {
      it('should return the string value', () => {
        jest.mocked(module.multiGet).mockResolvedValueOnce(['some-value']);

        return expect(EncryptedStorage.getItem('some-key'))
          .resolves
          .toStrictEqual('some-value');
      });

      it('should provide no error and a null value to the callback', (done) => {
        jest.mocked(module.multiGet).mockResolvedValueOnce(['some-value']);

        EncryptedStorage.getItem('some-key', (error, value) => {
          expect(error).toBeNull();
          expect(value).toStrictEqual('some-value');
          done();
        });
      });
    });
  });
});
