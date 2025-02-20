import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "frontend-wmyr.onrender.com",
    port: 8003,
    hmr: {
      protocol: "wss",
      host: "frontend-wmyr.onrender.com",
      port: 8004,
      clientPort: 8007,
    },
  },
});
