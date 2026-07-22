import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      '@app': path.resolve(rootDir, 'src/app'),
      '@pages': path.resolve(rootDir, 'src/pages'),
      '@widgets': path.resolve(rootDir, 'src/widgets'),
      '@features': path.resolve(rootDir, 'src/features'),
      '@shared': path.resolve(rootDir, 'src/shared'),
    },
  },
  // Workspace packages emit CJS (tsc Node16). Vite treats linked deps as
  // source and would serve raw CJS to the browser — prebundle to ESM.
  optimizeDeps: {
    include: [
      '@portfolio/data',
      '@portfolio/data/landing',
      '@portfolio/domain',
      '@portfolio/domain/landing',
    ],
  },
});
