module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'func-names': 0,
    'no-console': 0,
    'consistent-return': 0,
    camelcase: 0,
    'no-plusplus': 0,
  },
};
