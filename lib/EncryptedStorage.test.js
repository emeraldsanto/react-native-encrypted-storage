const EncryptedStorage = require('./EncryptedStorage');
const { NativeModules } = require('react-native');
const { RNEncryptedStorage } = NativeModules;

describe('lib/EncryptedStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem(key, value)', () => {
    it('should return true if it could store the value', async () => {
      const storeResult = await EncryptedStorage.setItem('keyName', 'value');
      expect(storeResult).toBe(true);
    });

    it('should return false if it could not store the value', async () => {
      RNEncryptedStorage.store.mockImplementationOnce(() => Promise.reject());
      const storeResult = await EncryptedStorage.setItem('keyName', 'value');
      expect(storeResult).toBe(false);
    });
  });

  describe('getItem(key)', () => {
    it('should return the value if it could be retrieved succesfully', async () => {
      const storeResult = await EncryptedStorage.getItem('keyName');
      expect(storeResult).toEqual('{ "foo": 1 }');
    });

    it('should return undefined if it could not retrieve the value', async () => {
      RNEncryptedStorage.retrieve.mockImplementationOnce(() => Promise.reject());
      const storeResult = await EncryptedStorage.getItem('keyName');
      expect(storeResult).toBe(undefined);
    });

    it('should return undefined if the value is an invalid JSON', async () => {
      RNEncryptedStorage.retrieve.mockImplementationOnce(() => Promise.resolve('string'));
      const storeResult = await EncryptedStorage.getItem('keyName');
      expect(storeResult).toEqual(undefined);
    });
  });

  describe('removeItem(key)', () => {
    it('should return true if it could remove the stored value', async () => {
      const storeResult = await EncryptedStorage.removeItem('keyName');
      expect(storeResult).toBe(true);
    });

    it('should return false if it could not store the value', async () => {
      RNEncryptedStorage.remove.mockImplementationOnce(() => Promise.reject());
      const storeResult = await EncryptedStorage.removeItem('keyName');
      expect(storeResult).toBe(false);
    });
  });
});
