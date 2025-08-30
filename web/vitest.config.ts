import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['test/setup.ts'],
    include: ['test/**/*.{test,spec}.tsx'],
  },
  esbuild: {
    jsxInject: "import React from 'react'",
  },
});
