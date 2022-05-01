module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
    '@typescript-eslint',
  ],
  settings: {
    'import/ignore': [
      'node_modules',
      '\\.(scss|less|css)$',
    ],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      },
      react: {
        version: '17.0.2',
      },
    },
  },
  ignorePatterns: ['public/scripts/**'],
  rules: {
    indent: ['error', 2],
    'max-len': ['error', 120],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        tsx: 'never',
        js: 'never',
        ts: 'never',
        jsx: 'never',
        scss: 'always',
      },
    ],
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'consistent-return': 'off',
    camelcase: 'off',
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
