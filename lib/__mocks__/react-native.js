module.exports = {
  NativeModules: {
    RNEncryptedStorage: {
      store: jest.fn(() => Promise.resolve()),
      retrieve: jest.fn(() => Promise.resolve('{ "foo": 1 }')),
      remove: jest.fn(() => Promise.resolve()),
    },
  },
};
