import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget/entry.tsx'),
      name: 'FeedbackWidget',
      formats: ['iife'],
      fileName: () => 'widget.js',
    },
    outDir: 'public',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2017',
  },
  publicDir: false,
});
