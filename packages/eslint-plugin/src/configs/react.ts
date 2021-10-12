import { Linter } from 'eslint';
import { getNamingConventionRule } from '../utils/getNamingConventionRule';

const config: Linter.Config = {
  extends: ['airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@alliedstrand', '@typescript-eslint', 'deprecation', 'import', 'jest', 'jsx-a11y', 'react', 'react-hooks'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        // Always attempt to resolve types under `<root>@types` directory.
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
    },
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  ignorePatterns: [
    'cjs',
    'coverage',
    'dist',
    'dist-storybook',
    'esm',
    'etc',
    'lib',
    'lib-amd',
    'lib-commonjs',
    'lib-esm',
    'node_modules',
    'temp',
    '**/__snapshots__',
    '**/__fixtures__',
  ],
  rules: {
    // Custom rules

    '@alliedstrand/no-global-react': 'error',
    '@alliedstrand/max-len': [
      'error',
      {
        ignorePatterns: [
          'require(<.*?>)?\\(',
          'https?:\\/\\/',
          '^(import|export) \\{ \\w+( as \\w+)? \\} from',
          '^import \\* as',
          '^\\s+(<path )?d=',
          '!raw-loader',
          '\\bdata:image/',
        ],
        max: 120,
      },
    ],

    // Built-in rules

    curly: ['error', 'all'],
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-constant-condition': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-new-wrappers': 'error',
    'no-restricted-globals': [
      'error',
      ...['blur', 'close', 'focus', 'length', 'name', 'parent', 'self', 'stop'].map(name => ({
        name,
        message: `"${name}" refers to a DOM global. Did you mean to reference a local value instead?`,
      })),
    ],
    'no-restricted-properties': [
      'error',
      { object: 'describe', property: 'only', message: 'describe.only should only be used during test development' },
      { object: 'it', property: 'only', message: 'it.only should only be used during test development' },
      {
        object: 'React',
        property: 'useLayoutEffect',
        message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
      },
    ],
    'no-shadow': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    radix: ['error', 'always'],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'no-case-declarations': 'off',
    'no-cond-assign': 'off',
    'no-continue': 'off',
    'no-control-regex': 'off',
    'no-else-return': 'off',
    'no-lonely-if': 'off',
    'no-loop-func': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'off',
    'no-template-curly-in-string': 'off',
    'no-undef': 'off',
    'no-undef-init': 'off',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    'no-useless-computed-key': 'off',
    'no-useless-concat': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    'no-useless-rename': 'off',
    'no-useless-return': 'off',
    'object-shorthand': 'off',
    'operator-assignment': 'off',
    'prefer-destructuring': 'off',
    'prefer-template': 'off',
    'spaced-comment': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    // Disabled in favor of the more performant '@alliedstrand/max-len' rule
    'max-len': 'off',
    // Disabled due to performance issues
    'no-empty-character-class': 'off',

    // @typescript-eslint rules

    ...getNamingConventionRule(false),

    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // eslint-plugin-import rules

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'off',
    'import/no-duplicates': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    // Disabled due to having no benefit for TypeScript projects
    'import/export': 'off',
    // Disabled as this rule may cause perf problems
    // See https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unused-modules': 'off',
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',

    // eslint-plugin-jsx-a11y rules

    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',

    // eslint-plugin-react rules

    'react/jsx-key': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
        ignoreRefs: true,
      },
    ],
    'react/no-string-refs': 'error',
    'react/self-closing-comp': 'error',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-pascal-case': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-render-return-value': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-stateless-function': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    // Disabled due to performance issues
    'react/no-unknown-property': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-es6-class': 'off',

    // eslint-plugin-react-hooks rules

    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
};

export default config;
