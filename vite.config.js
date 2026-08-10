import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.mp4'],

  server: {
    host: '0.0.0.0',  // CHANGED - listens on ALL network interfaces
    port: 5173,
    strictPort: true,  // Fails if port busy instead of switching
  }
})