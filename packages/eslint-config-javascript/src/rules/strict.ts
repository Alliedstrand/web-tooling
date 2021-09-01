import { Linter } from 'eslint';

const config: Linter.Config = {
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
};

export default config;
