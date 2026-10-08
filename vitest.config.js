import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/__mocks__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/vitest.config.{js,ts}',
        '**/vite.config.{js,ts}',
        '**/postcss.config.js',
        '**/tailwind.config.js',
        '**/src/main.jsx',
        '**/src/main.tsx',
        '**/src/App.jsx',
        '**/src/App.tsx',
        '**/src/types/**',
        '**/src/utils/date.js',
        '**/src/utils/avatar.js',
      ],
    },
  },
});