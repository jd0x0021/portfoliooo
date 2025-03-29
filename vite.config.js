import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, './src') }],
  },
  build: {
    rollupOptions: {
      output: {
        // Custom asset filename configuration
        assetFileNames: assetInfo => {
          // Get the relative file path of an asset
          // from the root directory (root = src folder)
          const assetPath = assetInfo.originalFileName
            ? path.relative(path.resolve(__dirname, 'src'), assetInfo.originalFileName)
            : '';

          // Don't add a file hash for assets in the assets\resume directory
          if (assetPath.startsWith('assets/resume')) {
            return 'assets/resume/[name][extname]';
          }

          // Retain the file hash for other assets
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
