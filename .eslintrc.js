module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
