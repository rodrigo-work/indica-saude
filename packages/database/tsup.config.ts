import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'ES2020',
  sourcemap: false,
  clean: true,
  dts: false,
  splitting: false,
  external: ['@prisma/client', '@prisma/extension-accelerate']
})
