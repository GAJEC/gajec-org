import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const backend = process.env.BACKEND_URL || 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: backend, changeOrigin: true },
      // Seserve nya pdf o png lang (Limited File Extension baka meron mag post ng XSS Payload)
      '^/certificate/[^/]+\\.(pdf|png)$': { target: backend, changeOrigin: true },
    },
  },
})
