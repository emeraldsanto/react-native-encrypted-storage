const EncryptedStorage = require('./EncryptedStorage');
const { NativeModules } = require('react-native');
const { RNEncryptedStorage } = NativeModules;

describe('lib/EncryptedStorage', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('using Promises', () => {
		describe('setItem(key, value)', () => {
			it('should return no errors if it could store the value', async () => {
				const storeError = await EncryptedStorage.setItem('key', 'value');
				expect(storeError).toBe(null);
			});
	
			it('should reject with an error if it could not store the value', async () => {
				RNEncryptedStorage.setItem.mockImplementationOnce(() => Promise.reject(new Error('Set error')));
	
				try {
					await EncryptedStorage.setItem('key', 'value');
				} catch (error) {
					expect(error.message).toBe('Set error');
				}
			});
		});
	
		describe('getItem(key)', () => {
			it('should return the value if it could be retrieved succesfully', async () => {
				const item = await EncryptedStorage.getItem('key');
				expect(item).toEqual('{ "foo": 1 }');
			});
	
			it('should return null if no value was found for that key', async () => {
				RNEncryptedStorage.getItem.mockImplementationOnce(() => Promise.resolve(undefined));
	
				const item = await EncryptedStorage.getItem('key');
				expect(item).toEqual(undefined);
			});
	
			it('should reject with an error if it could not retrieve the value', async () => {
				RNEncryptedStorage.getItem.mockImplementationOnce(() => Promise.reject(new Error("Get error")));
				
				try {
					await EncryptedStorage.getItem('key');
				} catch (error) {
					expect(error.message).toBe('Get error');
				}
			});
		});	
	
		describe('removeItem(key)', () => {
			it('should return no error if it could removed the stored value', async () => {
				const removeResult = await EncryptedStorage.removeItem('key');
				expect(removeResult).toBe(null);
			});
	
			it('should throw an error if it could not retrieve the stored value', async () => {
				RNEncryptedStorage.removeItem.mockImplementationOnce(() => Promise.reject(new Error("Remove error")));
	
				try {
					await EncryptedStorage.removeItem('key');
				} catch (error) {
					expect(error.message).toBe('Remove error');
				}
			});
		});
	});

	describe('using callbacks', () => {
		describe('setItem(key, value)', () => {
			it('should return no errors if it could store the value', () => {
				EncryptedStorage.setItem('key', 'value', err => {
					expect(err).toBe(null);
				});
			});
	
			it('should reject with an error if it could not store the value', () => {
				RNEncryptedStorage.setItem.mockImplementationOnce(() => Promise.reject(new Error('Set error')));

				EncryptedStorage.setItem('key', 'value', err => {
					expect(err.message).toBe('Set error');
				});
			});
		});
	
		describe('getItem(key)', () => {
			it('should return the value if it could be retrieved succesfully', () => {
				EncryptedStorage.getItem('key', (err, value) => {
					expect(err).toBe(null);
					expect(value).toEqual('{ "foo": 1 }');
				});
			});
	
			it('should return null if no value was found for that key', () => {
				RNEncryptedStorage.getItem.mockImplementationOnce(() => Promise.resolve(undefined));
	
				EncryptedStorage.getItem('key', (err, value) => {
					expect(err).toBe(null);
					expect(value).toBe(undefined);
				});
			});
	
			it('should reject with an error if it could not retrieve the value', () => {
				RNEncryptedStorage.getItem.mockImplementationOnce(() => Promise.reject(new Error("Get error")));
				
				EncryptedStorage.getItem('key', (err, value) => {
					expect(err.message).toEqual('Get error');
					expect(value).toBe(undefined);
				});
			});
		});	
	
		describe('removeItem(key)', () => {
			it('should return no error if it could removed the stored value', () => {
				EncryptedStorage.removeItem('key', err => {
					expect(err).toBe(null);
				});
			});
	
			it('should throw an error if it could not retrieve the stored value', () => {
				RNEncryptedStorage.removeItem.mockImplementationOnce(() => Promise.reject(new Error("Remove error")));
	
				EncryptedStorage.removeItem('key', err => {
					expect(err.message).toBe('Remove error');
				});
			});
		});
	});
});