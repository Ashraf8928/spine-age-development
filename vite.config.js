import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
server: {
    // Allows all hosts, useful for dev environments
    allowedHosts: true, 
    // OR allow specific hosts:
    // allowedHosts: ['.csb.app', 'example.com'],
    host: '0.0.0.0', // Listen on all addresses
  }
})