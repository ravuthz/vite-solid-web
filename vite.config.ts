/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import { mergeConfig, defineConfig as defineVitest } from 'vitest/config'
import solid from 'vite-plugin-solid'

const viteConfig = defineConfig({
  plugins: [solid()],
});

export default mergeConfig(viteConfig, defineVitest({
  test: {
    globals: true,
    environment: 'jsdom',
    testTransformMode: { web: ["/\.[jt]sx?$/"] },
    reporters: ['default', 'html'],
    outputFile: './dist/tests/reports/index.html',
    // include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reportsDirectory: './dist/tests/coverage'
    } as any,
  }
}))
