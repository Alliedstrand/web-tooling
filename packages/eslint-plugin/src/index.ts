import path from 'path';
import eslintConfigJavascript from '@alliedstrand/eslint-config-javascript';

export default {
  configs: {
    javascript: eslintConfigJavascript,
  },

  rules: {
    'max-len': path.join(__dirname, './rules/max-len'),
  },
};
