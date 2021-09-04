import * as maxLen from './max-len';
import * as noGlobalReact from './no-global-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rules: Record<string, any> = {
  [maxLen.name]: maxLen.rule,
  [noGlobalReact.name]: noGlobalReact.rule,
};
