import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/Alliedstrand/web-configs/blob/master/packages/eslint-plugin/README.md#${name}`,
);
