import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
};

export default config;
