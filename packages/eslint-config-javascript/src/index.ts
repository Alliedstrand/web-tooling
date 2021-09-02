import { Linter } from 'eslint';

const config: Linter.Config = {
  extends: [
    require('./rules/best-practices'),
    require('./rules/errors'),
    require('./rules/node'),
    require('./rules/style'),
    require('./rules/variables'),
    require('./rules/es6'),
    require('./rules/imports'),
    require('./rules/strict'),
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {},
};

export default config;
