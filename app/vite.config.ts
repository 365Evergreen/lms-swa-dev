import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  publicDir: 'public',
  server: {
    historyApiFallback: true
  }
});
