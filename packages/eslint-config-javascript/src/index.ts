import path from 'path';
import { Linter } from 'eslint';

const config: Linter.Config = {
  extends: [
    path.join(__dirname, './rules/best-practices'),
    path.join(__dirname, './rules/errors'),
    path.join(__dirname, './rules/node'),
    path.join(__dirname, './rules/style'),
    path.join(__dirname, './rules/variables'),
    path.join(__dirname, './rules/es6'),
    path.join(__dirname, './rules/imports'),
    path.join(__dirname, './rules/strict'),
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {},
};

export default config;
