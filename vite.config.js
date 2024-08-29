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
});
