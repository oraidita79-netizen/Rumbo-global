import { cpSync, existsSync } from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'copy-source-assets-for-static-hosting',
        apply: 'build',
        writeBundle(options) {
          const source = path.resolve(__dirname, 'src/assets');
          const output = path.join(options.dir ?? path.resolve(__dirname, 'dist'), 'src/assets');

          // Components refer to these files by their /src/assets/... URLs.
          // Copy them into Vite's output so those URLs also work after deployment.
          if (existsSync(source)) {
            cpSync(source, output, { recursive: true });
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
