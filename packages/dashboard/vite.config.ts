import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function normalizeBasePath(value: string | undefined) {
  if (!value) return '/';

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig({
  plugins: [react()],
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
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
