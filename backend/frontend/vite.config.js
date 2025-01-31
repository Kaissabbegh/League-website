import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy all requests to the backend
      "/images": "http://127.0.0.1:8000",
      "/api": "http://127.0.0.1:8000",
    },
  },
  plugins: [react()],
});
