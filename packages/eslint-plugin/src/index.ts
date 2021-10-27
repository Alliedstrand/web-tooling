import { Linter, Rule } from 'eslint';
import react from './configs/react';
import { rules } from './rules';

type EslintPluginConfig = {
  readonly rules: Record<string, Rule.RuleModule>;
  readonly configs: Record<string, Linter.Config>;
};

const pluginConfig: EslintPluginConfig = {
  rules,
  configs: {
    react,
  },
};

export default pluginConfig;
