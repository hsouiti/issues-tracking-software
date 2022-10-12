module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/react',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './client/tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'testing-library'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'object-curly-spacing': 1,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        'max-len': 100,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
