import { defineConfig } from 'tsup';

export default defineConfig([
  // ESM and CJS builds for npm package consumers
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: false,
    outDir: 'dist',
    external: ['react', 'react-dom'],
    treeshake: true,
    sourcemap: true,
    tsconfig: 'tsconfig.build.json',
  },
  // IIFE bundle for script tag usage
  {
    entry: ['src/widget/entry.tsx'],
    format: ['iife'],
    outDir: 'dist',
    globalName: 'FeedbackWidget',
    outExtension: () => ({ js: '.iife.js' }),
    external: [],
    noExternal: ['react', 'react-dom', 'modern-screenshot'],
    treeshake: true,
    sourcemap: true,
    minify: true,
    tsconfig: 'tsconfig.build.json',
  },
  // CLI init command
  {
    entry: { cli: 'src/cli/init.ts' },
    format: ['cjs'],
    outDir: 'dist',
    banner: { js: '#!/usr/bin/env node' },
    treeshake: true,
    sourcemap: false,
    dts: false,
    clean: false,
    tsconfig: 'tsconfig.build.json',
  },
]);
