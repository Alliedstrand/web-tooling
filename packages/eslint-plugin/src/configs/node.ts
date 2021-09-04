import { all as deepMerge } from 'deepmerge';
import { Linter } from 'eslint';
import react from './react';

const config: Linter.Config = deepMerge([
  react,
  {
    rules: {
      'no-console': 'off',
    },
  },
]);

export default config;
