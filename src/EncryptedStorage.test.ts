import { NativeModules } from 'react-native';
import EncryptedStorage from './EncryptedStorage';

const { RNEncryptedStorage } = NativeModules;

describe('lib/EncryptedStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('using Promises', () => {
    describe('setItem(key, value)', () => {
      it('should return no errors if it could store the value', () => {
        return expect(
          EncryptedStorage.setItem('key', 'value')
        ).resolves.toBeUndefined();
      });

      it('should reject with an error if it could not store the value', () => {
        RNEncryptedStorage.setItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Set error'))
        );

        return expect(EncryptedStorage.setItem('key', 'value')).rejects.toThrow(
          'Set error'
        );
      });
    });

    describe('getItem(key)', () => {
      it('should return the value if it could be retrieved succesfully', () => {
        return expect(EncryptedStorage.getItem('key')).resolves.toEqual(
          '{ "foo": 1 }'
        );
      });

      it('should return null if no value was found for that key', () => {
        RNEncryptedStorage.getItem.mockImplementationOnce(() =>
          Promise.resolve(undefined)
        );

        return expect(EncryptedStorage.getItem('key')).resolves.toBeUndefined();
      });

      it('should reject with an error if it could not retrieve the value', () => {
        RNEncryptedStorage.getItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Get error'))
        );

        return expect(EncryptedStorage.getItem('key')).rejects.toThrow(
          'Get error'
        );
      });
    });

    describe('removeItem(key)', () => {
      it('should return no error if it could removed the stored value', () => {
        return expect(
          EncryptedStorage.removeItem('key')
        ).resolves.toBeUndefined();
      });

      it('should throw an error if it could not retrieve the stored value', () => {
        RNEncryptedStorage.removeItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Remove error'))
        );

        return expect(EncryptedStorage.removeItem('key')).rejects.toThrow(
          'Remove error'
        );
      });
    });

    describe('clear()', () => {
      it('should return no error if it could clear the storage', () => {
        return expect(EncryptedStorage.clear()).resolves.toBeUndefined();
      });

      it('should throw an error if it could not clear the storage', () => {
        RNEncryptedStorage.clear.mockImplementationOnce(() =>
          Promise.reject(new Error('Clear error'))
        );

        return expect(EncryptedStorage.clear()).rejects.toThrow('Clear error');
      });
    });
  });

  describe('using callbacks', () => {
    describe('setItem(key, value)', () => {
      it('should return no errors if it could store the value', () => {
        EncryptedStorage.setItem('key', 'value', (error) => {
          expect(error).toBeUndefined();
        });
      });

      it('should reject with an error if it could not store the value', () => {
        RNEncryptedStorage.setItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Set error'))
        );

        EncryptedStorage.setItem('key', 'value', (error) => {
          expect(error?.message).toEqual('Set error');
        });
      });
    });

    describe('getItem(key)', () => {
      it('should return the value if it could be retrieved succesfully', () => {
        EncryptedStorage.getItem('key', (error, value) => {
          expect(error).toBeUndefined();
          expect(value).toEqual('{ "foo": 1 }');
        });
      });

      it('should return null if no value was found for that key', () => {
        RNEncryptedStorage.getItem.mockImplementationOnce(() =>
          Promise.resolve(undefined)
        );

        EncryptedStorage.getItem('key', (error, value) => {
          expect(error).toBeUndefined();
          expect(value).toBeUndefined();
        });
      });

      it('should reject with an error if it could not retrieve the value', () => {
        RNEncryptedStorage.getItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Get error'))
        );

        EncryptedStorage.getItem('key', (error, value) => {
          expect(error?.message).toEqual('Get error');
          expect(value).toBeUndefined();
        });
      });
    });

    describe('removeItem(key)', () => {
      it('should return no error if it could remove the stored value', () => {
        EncryptedStorage.removeItem('key', (error) => {
          expect(error).toBeUndefined();
        });
      });

      it('should throw an error if it could not retrieve the stored value', () => {
        RNEncryptedStorage.removeItem.mockImplementationOnce(() =>
          Promise.reject(new Error('Remove error'))
        );

        EncryptedStorage.removeItem('key', (error) => {
          expect(error?.message).toEqual('Remove error');
        });
      });
    });

    describe('clear()', () => {
      it('should return no error if it could clear the storage', () => {
        EncryptedStorage.clear((error) => {
          expect(error).toBeUndefined();
        });
      });

      it('should throw an error if it could not clear the storage', () => {
        RNEncryptedStorage.clear.mockImplementationOnce(() =>
          Promise.reject(new Error('Clear error'))
        );

        EncryptedStorage.clear((error) => {
          expect(error?.message).toEqual('Clear error');
        });
      });
    });
  });
});
