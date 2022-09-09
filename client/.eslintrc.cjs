module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    /*     'eslint:recommended',
     */ 'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './client/tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'object-curly-spacing': 1,
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
