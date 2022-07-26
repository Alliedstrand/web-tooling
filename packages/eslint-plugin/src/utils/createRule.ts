import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/Alliedstrand/web-tooling/blob/master/packages/eslint-plugin/README.md#${name}`,
);
