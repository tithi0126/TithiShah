import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensure assets are loaded correctly when deployed to a subpath
  plugins: [react()],
   preview: {
    allowedHosts: ['tithishah.onrender.com'],
    port: process.env.PORT || 5173,
    host: true
  }
})
