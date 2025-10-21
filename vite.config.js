import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/auth/, '')
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  },
  plugins: [react()],
})
