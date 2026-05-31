import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@mocks": path.resolve(__dirname, "./src/mocks/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@layouts": path.resolve(__dirname, "./src/layouts/"),
      "@routes": path.resolve(__dirname, "./src/routes/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@components": path.resolve(__dirname, "./src/components/"),
    },
  },
});
