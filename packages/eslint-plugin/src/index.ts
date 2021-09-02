export default {
  configs: {
    javascript: require('@alliedstrand/eslint-config-javascript'),
  },

  rules: {
    'max-len': require('./rules/max-len'),
  },
};
