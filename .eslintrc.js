const project = require.resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    'prettier',
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript')
  ],
  ignorePatterns: [
    'node_modules/',
    'lib/'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
