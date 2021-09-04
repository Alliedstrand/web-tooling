import { Linter, Rule } from 'eslint';
import node from './configs/node';
import react from './configs/react';
import { rules } from './rules';

type EslintPluginConfig = {
  readonly rules: Record<string, Rule.RuleModule>;
  readonly configs: Record<string, Linter.Config>;
};

const pluginConfig: EslintPluginConfig = {
  rules,
  configs: {
    node,
    react,
  },
};

export default pluginConfig;
