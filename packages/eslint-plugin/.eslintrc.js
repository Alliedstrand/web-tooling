module.exports = {
  overrides: [
    {
      files: ['src/rules/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
