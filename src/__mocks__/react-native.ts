module.exports = {
  Platform: {
    select: jest.fn().mockImplementation(
      (options) => options.ios ?? options.default
    )
  },
  NativeModules: {
    EncryptedStorage: {
      getAllKeys: jest.fn().mockResolvedValue([]),
      multiGet: jest.fn().mockResolvedValue([]),
      multiSet: jest.fn().mockResolvedValue(null),
      multiRemove: jest.fn().mockResolvedValue(null),
      clear: jest.fn().mockResolvedValue(null),
    },
  },
}
