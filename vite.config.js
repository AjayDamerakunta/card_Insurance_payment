import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  json: {
    stringify: true, // Enable JSON imports
   },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});