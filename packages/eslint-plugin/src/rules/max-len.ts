import { createRule } from '@alliedstrand/web-configs-utils/esm';

const rule = createRule({
  name: 'max-len',
  meta: {
    type: 'layout',
    docs: {
      // The default `max-len` rule included with `eslint` is surprisingly slow
      // due to the following:
      // - The default rule has options to detect and uniquely handle comments, strings, etc.
      // - The default rule checks the ignore regex without a preliminary length check first.
      description: 'Enforces a maximum line length in a more performant manner than the default ESLint rule',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      max: 'This line has a length of {{lineLength}}. Maximum allowed is {{max}}.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignorePatterns: {
            description: 'regular expressions to ignore',
            type: 'array',
            items: { type: 'string' },
          },
          max: {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [],
  create: context => {
    const options: { max?: number; ignorePatterns?: string[] } = context.options[0] || {};
    const { ignorePatterns = [], max = 120 } = options;

    const ignoreRegexes = ignorePatterns.map(pat => new RegExp(pat));

    const sourceCode = context.getSourceCode();

    return {
      Program: program => {
        sourceCode.getLines().forEach((line, i) => {
          // Check the length first which is important for performance.
          if (line.length > max && !ignoreRegexes.some(r => r.test(line))) {
            const lineNumber = i + 1;
            context.report({
              node: program,
              loc: {
                start: { line: lineNumber, column: 0 },
                end: { line: lineNumber, column: line.length },
              },
              messageId: 'max',
              data: { lineLength: line.length, max },
            });
          }
        });
      },
    };
  },
});

export default rule;
