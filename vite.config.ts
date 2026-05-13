import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    // Drop the source-map in production for smaller deploys.  Errors are
    // still reportable via standard stack traces with column info.
    sourcemap: false,
    // Manual chunking — split heavy / rarely-changing dependencies out
    // of the main bundle so they can be cached independently across
    // deploys and don't bust on every source change.
    rollupOptions: {
      output: {
        manualChunks: {
          // React + routing — almost never changes, perfect long-cache target
          react: ['react', 'react-dom', 'react-router-dom'],
          // Motion stack — heavy but rarely tweaked once tuned
          motion: ['gsap', 'lenis'],
          // Three.js + R3F live in their own chunk and Hero3D imports
          // them lazily.  No need to re-list here — Vite splits the
          // dynamic import automatically and naming it 'Hero3D' is
          // already handled by the lazy() call.
        },
      },
    },
    // Increase the warning threshold so the Hero3D chunk doesn't trip
    // a CI alarm.  It's intentionally heavy and lazy-loaded only on
    // desktop + motion-allowed clients.
    chunkSizeWarningLimit: 1024,
    // esbuild minifier (default) is faster than terser and gives near-
    // identical output for our code size.  No change needed; documented
    // here for clarity.
    minify: 'esbuild',
    // Inline assets smaller than this into the JS bundle so the browser
    // doesn't pay a round-trip cost for tiny icons.  4096 is the default;
    // keeping it explicit so we don't have to remember next time.
    assetsInlineLimit: 4096,
    // CSS code-splitting per chunk so a route that doesn't need a piece
    // of CSS doesn't download it.
    cssCodeSplit: true,
    // Final assets go to dist/assets/ with content-hash filenames
    // (Vite's default — keeping this explicit for documentation).
    assetsDir: 'assets',
  },
});
