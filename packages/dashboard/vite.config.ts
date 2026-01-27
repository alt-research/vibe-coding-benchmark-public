import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // For custom domain, base is '/'
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimize for production (esbuild is faster and bundled with Vite)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'chart': ['chart.js', 'react-chartjs-2'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 9011,
    allowedHosts: [
      'vibecoding.llmbench.xyz',
    ],
  },
});
