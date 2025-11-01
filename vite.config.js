import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensure assets are loaded correctly when deployed to a subpath
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Changed from 5000 to 3000
        changeOrigin: true,
      },
    },
  },
})
