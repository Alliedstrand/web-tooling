import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from '../utils/createRule';

export const name = 'no-global-react';

export const rule = createRule({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent accidental references to the global React namespace.',
      recommended: 'error',
    },
    messages: {
      missingImport: 'React must be explicitly imported in order to reference it.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    let hasReactImport = false;

    return {
      ImportDeclaration: imprt => {
        if (
          imprt.source &&
          imprt.source.type === AST_NODE_TYPES.Literal &&
          imprt.source.value === 'react' &&
          imprt.specifiers.some(spec => spec.local.name === 'React')
        ) {
          hasReactImport = true;
        }
      },
      Identifier: identifier => {
        if (
          identifier.name === 'React' &&
          !hasReactImport &&
          // This one ensures we don't flag the import of React
          !(identifier.parent && /^Import(.*?)Specifier$/.test(identifier.parent.type))
        ) {
          context.report({
            node: identifier,
            messageId: 'missingImport',
          });
        }
      },
    };
  },
});
