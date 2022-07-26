/* eslint-disable @typescript-eslint/naming-convention */

import { Linter } from 'eslint';

const camelCase = '[a-z][a-zA-Z\\d]*'; // Must start with a lowercase letter
const camelOrPascalCase = '[a-zA-Z][a-zA-Z\\d]*'; // Must start with a letter
const upperCase = '[A-Z][A-Z\\d]*(_[A-Z\\d]*)*'; // Must start with a letter and not contain any consecutive underscores
const camelOrPascalOrUpperCase = `(${camelOrPascalCase}|${upperCase})`;
const builtins = '^(any|Number|number|String|string|Boolean|boolean|Undefined|undefined)$';

/**
 * Retrieve a rule configuration that enforces naming conventions.
 * @param prefixWithI true to require that interfaces are prefixed with an 'I'; false otherwise
 * @returns A rule configuration that enforces naming conventions
 */
export const getNamingConventionRule = (prefixWithI: boolean): Linter.RulesRecord => ({
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'function', format: ['camelCase'], leadingUnderscore: 'allow' },
    { selector: 'method', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require' },
    { selector: 'method', modifiers: ['protected'], format: ['camelCase'], leadingUnderscore: 'allow' },
    // This will also pick up default-visibility methods and methods on plain objects,
    // which is not really what we want, but there's not a good way around it.
    {
      selector: 'method',
      modifiers: ['public'],
      format: null,
      // camelCase, optional UNSAFE_ prefix to handle deprecated React methods
      custom: { regex: `^(UNSAFE_)?${camelCase}$`, match: true },
    },
    { selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'forbid' },
    {
      selector: 'interface',
      format: ['PascalCase'],
      ...(prefixWithI ? { prefix: ['I'] } : { custom: { regex: '^I[A-Z]', match: false } }),
    },
    {
      selector: 'default',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      // Allow leading and optional trailing __
      // (The rest of the regex enforces the same casing constraint listed above)
      filter: { regex: `^__${camelOrPascalOrUpperCase}(__)?$`, match: false },
      // Prohibit names overlapping with built-in types.
      custom: { regex: builtins, match: false },
      // An alternative way to set up this rule is set `format: null` and pass a single custom
      // regex which matches absolutely everything. However, this leads to unhelpful error messages:
      //   "Variable name `whatever` must match the RegExp: /someAbsurdlyLongUnreadableRegex/"
      // For reference in case we ever want this anyway:
      // format: null,
      // custom: {
      //   regex: `(?!${builtins})^(_?${camelOrPascalOrUpperCase}|__${camelOrPascalOrUpperCase}(__)?)$`,
      //   match: true
      // }
    },
  ],
});
