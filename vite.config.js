import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pomodoro/", // Change this to your GitHub repo name
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
