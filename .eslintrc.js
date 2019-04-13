module.exports = {
  env: {
    commonjs: true,
    es6: true,
    browser: true
  },
  extends: "aqua/vue",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "indent": ["error", 2]
  }
};
