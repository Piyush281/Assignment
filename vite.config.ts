import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    environment: 'jsdom',      // Simulates browser environment
    globals: true,             // Allows using describe, it, expect globally
    setupFiles: './src/setupTests.ts', // Setup file path
  },
})
