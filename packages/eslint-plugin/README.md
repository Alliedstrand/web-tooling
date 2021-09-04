# @alliedstrand/eslint-plugin

**ESLint linting configuration and rules for Alliedstrand web projects.**

## Configs

To use an ESLint configuration included in this package, add:

```json
{
  "extends": ["plugin:@alliedstrand/<config name>"]
}
```

or

```json
{
  "extends": ["plugin:@alliedstrand/eslint-plugin/<config name>"]
}
```

where `<config name>` is:

- `react`: For React-based projects written primarily in TypeScript
- `react-node`: For React-based projects written primarily in TypeScript, but are being executed within a Node.js runtime environment.

## Rules

### `max-len`

#### Rule Details

This rule enforces a maximum line length to increase code readability and maintainability. The length of a line is defined as the number of Unicode characters in the line.

This rule is more performant than the default [`max-len`](https://eslint.org/docs/rules/max-len) rule included by ESLint by:

- Eliminating tab support (it only handles spaces for indentation); and
- Eliminating support for multi-byte unicode characters; and
- Supporting additional options for handling comments, strings and URLs ; and
- Performing a basic string length check before executing any regular expression logic.

#### Options

The rule requires an options object containing:

- `max` (required): enforces a maximum line length
- `ignorePatterns` (optional): ignores lines matching a regular expression

### `no-global-react`

Disallow references to the `React` global namespace and require React to be explicitly imported.

## License

[ALLIEDSTRAND CONFIDENTIAL](./LICENSE)
