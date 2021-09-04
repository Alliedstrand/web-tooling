// @ts-check

/* eslint-disable import/no-extraneous-dependencies */

import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import rollupPluginJSON from '@rollup/plugin-json';
import rollupPluginAutoExternal from 'rollup-plugin-auto-external';

const common = {
  input: 'src/index.ts',

  output: {
    dir: './dist',
    exports: 'default',
    sourcemap: false,
  },

  treeshake: {
    annotations: true,
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false,
  },
};

function getPlugins() {
  return [
    rollupPluginAutoExternal(),
    rollupPluginNodeResolve(),
    rollupPluginCommonjs(),
    rollupPluginTypescript({
      outputToFilesystem: true,
    }),
    rollupPluginJSON({
      preferConst: true,
    }),
  ];
}

const cjs = {
  ...common,

  output: {
    ...common.output,
    entryFileNames: '[name].js',
    format: 'cjs',
  },

  plugins: getPlugins(),
};

const esm = {
  ...common,

  output: {
    ...common.output,
    entryFileNames: '[name].mjs',
    format: 'esm',
  },

  plugins: getPlugins(),
};

export default [cjs, esm];
