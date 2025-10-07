import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'ES2020',
  sourcemap: false,
  clean: true,
  dts: true,
  splitting: false
})
