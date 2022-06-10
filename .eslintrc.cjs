module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 0,
    'import/extensions': 0,
    'no-console': [2, { allow: ['debug', 'error', 'time', 'timeEnd'] }],
  },
};
