import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host:true,
    proxy: {
      '/auth': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/auth/, '')
      },
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  },
  plugins: [react()],
})
