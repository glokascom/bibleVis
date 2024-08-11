import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['./__tests__/**/*.test.{js,jsx,ts,tsx}'],
    globals: true, // Это автоматически добавляет expect в глобальное пространство
    setupFiles: ['./setupTests.js'],
  },
})
